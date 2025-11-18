'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function TeamSkillChart() {
  const data = {
    labels: ['AI/ML', 'Leadership', 'Technical Skills', 'Communication', 'Strategy', 'Innovation'],
    datasets: [
      {
        label: 'Team Average',
        data: [85, 75, 90, 80, 70, 85],
        fill: true,
        backgroundColor: 'rgba(0, 245, 212, 0.2)',
        borderColor: 'rgb(0, 245, 212)',
        pointBackgroundColor: 'rgb(0, 245, 212)',
      },
      {
        label: 'Industry Benchmark',
        data: [70, 80, 85, 75, 75, 70],
        fill: true,
        backgroundColor: 'rgba(124, 121, 198, 0.2)',
        borderColor: 'rgb(124, 121, 198)',
        pointBackgroundColor: 'rgb(124, 121, 198)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid: { color: 'rgba(255,255,255,0.2)' },
        pointLabels: { color: '#fff', font: { size: 12 } },
        ticks: { color: 'transparent' },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#fff' },
      },
    },
  };

  return (
    <div className="relative h-80 w-full">
      <Radar data={data} options={options} />
    </div>
  );
}

