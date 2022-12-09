import { useEffect, useState } from 'react';
import './App.css';
import Table from '../Table';

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <h1>Hello</h1>
      <Table data={data}/>
    </>
  );
}

export default App;
