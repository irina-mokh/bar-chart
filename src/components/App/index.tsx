import { useEffect, useState } from 'react';
import { DataType } from '../../types';
import { BarChart } from '../BarChart';

const getData = async () => {
  const res = await fetch('https://6464e49e228bd07b353c15ce.mockapi.io/sales');
  const data = await res.json();
  console.log('data from API:', data);
  return data;
};

function App() {
  const [data, setData] = useState<Array<DataType>>([]);

  useEffect(() => {
    getData().then((res) => {
      if (res.length) {
        setData(res);
      }
    });
  }, []);

  return (
    <div className="container">
      <BarChart name="Динамика дохода" data={data}></BarChart>
    </div>
  );
}

export default App;
