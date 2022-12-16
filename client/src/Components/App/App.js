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
  const [bet, setBet] = useState({ user: '', deadline: '', newOffer: {} });
  const wsRef = useRef(null);

  useEffect(() => {
    fetch('api')
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  useEffect(() => {
    // Create WebSocket connection.
    // wsRef.current = new WebSocket(`ws://${window.location.host}`);
    wsRef.current = new WebSocket('ws://localhost:5000');

    // Connection opened
    wsRef.current.addEventListener('open', (event) => {
      console.log('Connected to WS Server');
    });

    // Listen for messages
    wsRef.current.addEventListener('message', (event) => {
      const newBet = JSON.parse(event.data);
      if (newBet.deadline !== '') { // reciving start bet msg
        newBet.deadline = dayjs(newBet.deadline).utc();
      }
      setBet(newBet);
      setData(data => {
        if (!newBet.user || !data[newBet.user]) return data;
        const { participant } = data[newBet.user];
        return { ...data, [newBet.user]: { participant, offer: newBet.newOffer }}
      });
    });

    return () => wsRef.current.close();
  }, []);


  const startBet = () => {
    const newDeadline = dayjs.utc().add(2, 'm');
    const newBet = { user: thisUser, deadline: newDeadline, newOffer: data[thisUser].offer };
    wsRef.current.send(JSON.stringify(newBet));
  };

  const endBet = () => {
    const newBet = { user: thisUser, deadline: '', newOffer: bet.newOffer };
    wsRef.current.send(JSON.stringify(newBet));
  };


  return (
    <>
      <Header/>
      <div className='page'>
        <Table
          data={data}
          thisUser={thisUser}
          bet={bet}
          setBet={setBet}
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
