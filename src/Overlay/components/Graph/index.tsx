import { Line } from 'react-chartjs-2';
import teamColorStyle from '../../../utils/teamColorStyle';

import style from './style.module.css';

export interface Props {
  title: string;
  label: string;
  data: Array<{ value: number; gameTime: number }>;
  topLabel?: { text: string; color?: string };
  bottomLabel?: { text: string; color?: string };
}

const Graph = ({
  title,
  label,
  data,
  topLabel = { text: '' },
  bottomLabel = { text: '' },
}: Props) => {
  const labels = data.map(({ gameTime }) => gameTime);
  const max = Math.max(...data.map(({ value }) => Math.abs(value)), 200);
  const graphData = {
    labels: labels,
    datasets: [
      {
        label,
        data: data.map(({ value, gameTime }) => ({
          x: new Date(gameTime),
          y: value,
        })),
        fill: false,
        backgroundColor: 'transparent',
        borderColor: '#eec12d',
        lineTension: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: title,
      fontColor: '#ffffff',
      fontSize: 24,
      fontStyle: 'normal',
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            zeroLineColor: 'rgba(255, 255, 255, 0.56)',
            color: 'rgba(255, 255, 255, 0.1)',
          },
          position: 'right',
          ticks: {
            suggestedMin: -max,
            suggestedMax: max,
            callback: (value: number) => {
              return Math.abs(value);
            },
            fontColor: '#ffffff',
            major: {
              enabled: true,
            },
          },
        },
      ],
      xAxes: [
        {
          type: 'time',
          time: {
            stepSize: 1000 * 60,
            unit: 'millisecond',
            displayFormats: {
              millisecond: 'mm:ss',
            },
          },
          ticks: {
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

  return (
    <div className={style.container}>
      <Line data={graphData} options={options} />
      {topLabel?.text && (
        <div
          className={style.topLabel}
          style={topLabel?.color ? teamColorStyle(topLabel.color) : undefined}
        >
          <span>{topLabel.text}</span>
        </div>
      )}
      {bottomLabel?.text && (
        <div
          className={style.bottomLabel}
          style={
            bottomLabel?.color ? teamColorStyle(bottomLabel.color) : undefined
          }
        >
          <span>{bottomLabel.text}</span>
        </div>
      )}
    </div>
  );
};

export default Graph;
