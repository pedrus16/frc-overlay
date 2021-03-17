import { Line } from 'react-chartjs-2';
import { range } from '../../../utils';

export interface Props {
  values: number[];
}

const Graph = ({ values }: Props) => {
  const labels = range(values.length);
  const max = Math.max(...values.map((value) => Math.abs(value)));
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Experience',
        data: values,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          position: 'right',
          ticks: {
            suggestedMin: -max,
            suggestedMax: max,
            // reverse: false,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
