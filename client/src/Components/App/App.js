import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './App.css';
import Header from '../Header';
import Table from '../Table';
import Form from '../Form';

dayjs.extend(utc);

function App() {
  const [data, setData] = useState({});
  const [thisUser, setThisUser] = useState(1);
  const [bet, setBet] = useState({ user: '', deadline: '' });
  const wsRef = useRef(null);

  useEffect(() => {
    fetch('api')
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  useEffect(() => {
    // Create WebSocket connection.
    wsRef.current = new WebSocket(`ws://${window.location.host}`);

    // Connection opened
    wsRef.current.addEventListener('open', (event) => {
      console.log('Connected to WS Server');
    });

    // Listen for messages
    wsRef.current.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.deadline !== '') {
        parsedData.deadline = dayjs(parsedData.deadline).utc();
      }
      console.log('parsedData ', parsedData);
      setBet(parsedData);
    });

    return () => wsRef.current.close();

  }, [])


  const startBet = () => {
    const newDeadline = dayjs.utc().add(2, 'm');
    const data = { user: thisUser, deadline: newDeadline };
    console.log('Starting bet: ', JSON.stringify(data));
    wsRef.current.send(JSON.stringify(data));
  }

  const endBet = () => {
    const data = { user: thisUser, deadline: '' };
    console.log('Ending bet: ', JSON.stringify(data));
    wsRef.current.send(JSON.stringify(data));
  }


  return (
    <>
      <Header/>
      <div className='page'>
        <Table
          data={data}
          thisUser={thisUser}
          bet={bet}
          startBet={startBet}
          endBet={endBet}
        />
        <Form
          data={data}
          thisUser={thisUser}
          setThisUser={setThisUser}
        />
      </div>
    </>
  );
}

export default App;
