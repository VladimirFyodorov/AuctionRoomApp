import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header';
import Table from '../Table';
import Form from '../Form';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const part1 = {
      participant: { id: 1, name: 'ООО Ласточка'},
      offer: { price: 100 },
    };

    const part2 = {
      participant: { id: 2, name: 'ООО Бабочка'},
      offer: { price: 99 },
    };

    setData({...data, 1: part1, 2: part2});
  }, []);

  return (
    <>
      <Header/>
      <div className='page'>
        <Table data={data}/>
        <Form data={data}/>
      </div>
    </>
  );
}

export default App;
