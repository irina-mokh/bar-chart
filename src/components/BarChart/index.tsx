import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
	TooltipXAlignment,
	TooltipYAlignment,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { BarChartProps } from '../../types';
import { getValuesByRange } from '../../utils';
import { Select } from '../Select';
import { selectOptions } from '../../utils/consts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  layout: {
    padding: {
      bottom: 0,
    },
  },
  scales: {
    x: {
			ticks: {
				maxRotation: 0,
				font: {
					size: 20,
				},
			},
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
			ticks: {
				font: {
					size: 20,
				},
			}
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      backgroundColor: '#65FF8E',
      boxHeight: 32,
      boxPadding: 8,
      bodyColor: '#000000',
      caretSize: 0,
      // eslint-disable-next-line prettier/prettier
      xAlign: 'center' as TooltipXAlignment,
      yAlign: 'bottom' as TooltipYAlignment,
      callbacks: {
        title: () => '',
      },
    },
  },
};

export const BarChart = ({name, data}: BarChartProps) => {
  const [range, setRange] = useState<string>('month');

	const rangeHandler = (val: string) => {
		setRange(val);
	};
  //TODO: handle range change for year and 6 month

	// create a dataset with every step(day / month) from selected range. Sum same date values or create value: 0 for absent day/month.
	const modifiedData = getValuesByRange(range, data);
  const labels = modifiedData.map((item, i) => (i % 5 == 0 ? item.date.slice(8) : ''));
  const charData = {
    labels,
    datasets: [
      {
        data: modifiedData.map((i) => i.value),
        backgroundColor: ' #000AFF',
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <section className="bar-chart">
			<header className="bar-chart__header">
				<h2 className="chart__name">{name}</h2>
				<Select options={selectOptions} selected={range} handler={rangeHandler}></Select>
			</header>
      {data.length ? <Bar options={options} data={charData} /> : null}
    </section>
  );
};
