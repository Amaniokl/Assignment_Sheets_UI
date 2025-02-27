import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Chart.css'
ChartJS.register(...registerables);

function Chart({ type = 'bar', data, options }) {
  const ChartComponent = {
    bar: Bar,
    line: Line,
    pie: Pie
  }[type];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#374151', // Tailwind gray-700
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937', // Tailwind gray-900
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        titleFont: { weight: 'bold' },
        borderWidth: 1,
        borderColor: '#6b7280', // Tailwind gray-500
      },
    },
    scales: {
      x: {
        ticks: { color: '#374151' },
        grid: { color: '#e5e7eb' }, // Tailwind gray-300
      },
      y: {
        ticks: { color: '#374151' },
        grid: { color: '#e5e7eb' },
      },
    },
    ...options,
  };

  return (
    <div className="chart-container">
      {data ? <ChartComponent data={data} options={chartOptions} /> : <p className="loading-text">Loading chart...</p>}
    </div>
  );
}

export default Chart;
