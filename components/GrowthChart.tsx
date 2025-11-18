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

interface GrowthChartProps {
  labels: string[];
  totalUsers: number[];
  paidUsers: number[];
}

export default function GrowthChart({ labels, totalUsers, paidUsers }: GrowthChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Users',
        data: totalUsers,
        borderColor: 'rgb(0, 245, 212)',
        backgroundColor: 'rgba(0, 245, 212, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Paid Users',
        data: paidUsers,
        borderColor: 'rgb(124, 121, 198)',
        backgroundColor: 'rgba(124, 121, 198, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
    },
  };

  return (
    <div className="relative h-80 w-full">
      <Line data={data} options={options} />
    </div>
  );
}

