import React from 'react';
import { Chart, LinearScale, CategoryScale, LineElement, Tooltip, Legend, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface InvestmentData {
  contributions: number;
  dailyReturn: number;
  date: { seconds: number, nanoseconds: number };
  portfolioIndex: number;
  portfolioValue: number;
}

interface InvestmentEvolutionChartProps {
  data: InvestmentData[];
}

const InvestmentEvolutionChart: React.FC<InvestmentEvolutionChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date.seconds * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Valor de la cartera',
        data: data.map(item => item.portfolioValue),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)', // color rojo
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Contribuciones',
        data: data.map(item => item.contributions),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)', // color verde
        borderColor: 'rgba(75, 192, 192, 0.2)',
      }
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha'
        },
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
      <Line data={chartData} options={options} />
  )
};

export default InvestmentEvolutionChart;