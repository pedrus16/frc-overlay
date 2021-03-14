import { Line } from 'react-chartjs-2';

// import { msToTime } from '../../../utils';

export interface Props {
  data: Array<{ value: number; gameTime: number }>;
}

const MAX_TOTAL_EXPERIENCE = 16200;

const Graph = ({ data }: Props) => {
  const labels = data.map(({ gameTime }) => gameTime);
  const max = Math.max(...data.map(({ value }) => Math.abs(value)));
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: 'Experience',
        data: data.map(({ value, gameTime }) => ({
          x: new Date(gameTime),
          y: value,
        })),
        fill: false,
        backgroundColor: 'transparent',
        borderColor: '#eec12d',
        lineTension: 0,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      gridLines: {
        scale: {
          zeroLineColor: '#ffffff',
        },
      },
      yAxes: [
        {
          position: 'right',
          ticks: {
            suggestedMin: -max,
            suggestedMax: max,
            callback: (value: number) => {
              return Math.abs(value);
            },
            fontColor: '#ffffff',
          },
        },
      ],
      xAxes: [
        {
          type: 'time',
          // distribution: 'series',
          time: {
            stepSize: 1000 * 60,
            unit: 'millisecond',
            displayFormats: {
              millisecond: 'mm:ss',
            },
          },
          ticks: {
            // callback: (gameTime: number) => {
            //   return msToTime(gameTime);
            // },
            fontColor: '#ffffff',
          },
        },
      ],
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return <Line data={graphData} options={options} />;
};

export default Graph;
