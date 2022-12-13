import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header';
import Table from '../Table';
import Form from '../Form';

function App() {
  const [data, setData] = useState({});
  const [thisUser, setThisUser] = useState(1);
  const [bettingUser, setBettingUser] = useState(1);
  const [deadline, setDeadline] = useState('');
  
  const startBet = () => {
    setBettingUser(thisUser);
    const twoMinutes = 2*60;
    setDeadline(twoMinutes)
  }

  useEffect(() => {
    fetch("api")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <>
      <Header/>
      <div className='page'>
        <Table
          data={data}
          bettingUser={bettingUser}
          thisUser={thisUser}
          startBet={startBet}
          deadline={deadline}
          setDeadline={setDeadline}
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
