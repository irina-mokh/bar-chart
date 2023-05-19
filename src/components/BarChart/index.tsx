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
	ChartOptions,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { BarChartProps } from '../../types';
import { getValuesByRange } from '../../utils';
import { selectOptions } from '../../utils/consts';

import { Select } from '../Select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options: ChartOptions<'bar'> = {
  responsive: true,
	aspectRatio: 2.7,
  scales: {
    x: {
			ticks: {
				color: '#000000',
				maxRotation: 0,
				font: {
					size: 20,
					
				},
				padding: 17,
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
				color: '#000000',
				padding: 12,
				crossAlign: 'far',
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
				hoverBorderColor: '#000472',
				hoverBorderWidth: 2,
				// boxShadow: '0px 0px 8px 6px rgba(0, 10, 255, 0.15) inset -2px -2px 6px rgba(0, 2, 53, 0.7), inset 2px 2px 6px rgba(0, 2, 53, 0.7)',
      },
    ],
  };

  return (
    <section className="bar-chart">
			<header className="bar-chart__header">
				<h2 className="bar-chart__name">{name}</h2>
				<Select options={selectOptions} selected={range} handler={rangeHandler}></Select>
			</header>
      {data.length ? 
			<main className='bar-chart__canvas'>
				<Bar options={options} data={charData} /> 
			</main>
			: null}
    </section>
  );
};
