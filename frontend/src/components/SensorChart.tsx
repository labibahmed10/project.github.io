/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sensor Data Over Time",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
      },
      ticks: {
        callback: function (value: number) {
          return value.toFixed(1);
        },
      },
    },
  },
};

const SensorChart: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md w-[82vw] h-[60vh] mb-5 mx-auto">
      <Line options={chartOptions} data={data} />
    </div>
  );
};
export default SensorChart;
