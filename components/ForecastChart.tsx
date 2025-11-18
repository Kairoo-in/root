'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ForecastChart() {
  const data = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
    datasets: [
      {
        label: 'Total Users',
        data: [1250, 2800, 8250, 25000, 62000, 125000],
        borderColor: 'rgb(0, 245, 212)',
        backgroundColor: 'rgba(0, 245, 212, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Paid Users',
        data: [125, 336, 1049, 3247, 7891, 15234],
        borderColor: 'rgb(124, 121, 198)',
        backgroundColor: 'rgba(124, 121, 198, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'MRR ($K)',
        data: [3.6, 9.7, 30.4, 94.2, 228.8, 441.8],
        borderColor: 'rgb(255, 61, 127)',
        backgroundColor: 'rgba(255, 61, 127, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' },
        title: {
          display: true,
          text: 'Users',
          color: '#fff',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        ticks: { color: '#ff3d7f' },
        title: {
          display: true,
          text: 'MRR ($K)',
          color: '#ff3d7f',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="relative h-80 w-full">
      <Line data={data} options={options} />
    </div>
  );
}

