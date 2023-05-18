import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getValuesByRange } from '../../utils';
import { DataType, RangeType } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // eslint-disable-next-line prettier/prettier
      // position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const getData = async () => {
  const res = await fetch('https://6464e49e228bd07b353c15ce.mockapi.io/sales');
  const data = await res.json();
  console.log('data from API:', data);
  return data;
};

export const BarChart = () => {
  const [range, setRange] = useState<RangeType>('month');
  const [data, setData] = useState<Array<DataType>>([]);

  useEffect(() => {
    getData().then((res) => {
      if (res.length) {
        setData(getValuesByRange(range, res));
      }
    });
  }, []);

  const labels = data.map((i) => i.date.slice(8));
  const charData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.map((i) => i.value),
        backgroundColor: 'rgba(69, 56, 213, 0.789)',
      },
    ],
  };

  return <Bar options={options} data={charData} />;
};
