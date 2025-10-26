"use client";

import React, { forwardRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type DataPoint = {
  x: string | Date;
  y: number;
};

interface PerformanceChartProps {
  dataPoints: DataPoint[];
}

const LinearitasChart = forwardRef<HTMLDivElement, PerformanceChartProps>(
  ({ dataPoints }, ref) => {
  const data = {
    datasets: [
      {
        label: "linearitas",
        data: dataPoints,
        borderColor: "rgb(37, 99, 235)", // blue-600
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        fill: false,
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "day" as const },
        title: { display: true, text: "Tanggal" },
        grid: { color: "#e5e7eb" },
      },
      y: {
        beginAtZero: false,
        title: { display: true, text: "Koefisien Linearitas" },
        grid: { color: "#e5e7eb" },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          upperLimit: {
            type: "line" as const,
            yMin: 0.1,
            yMax: 0.1,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true, // ✅ wajib supaya muncul
              content: ["NLU (0.1)"], // bisa array untuk multiline
              position: "end" as const, // pindah ke ujung kanan
              backgroundColor: "rgba(255,0,0,0.8)",
              color: "white",
              padding: 4,
              font: {
                weight: "bold" as const,
              },
              clip: false,
            },
          },
        },
      },
    },
  };

  return (
    <div ref={ref} className="bg-white shadow-md rounded-xl p-4 w-[90%] min-h-96">
      <Line data={data} options={options} />
    </div>
  );
}
);

LinearitasChart.displayName = "LinearitasChart";
export default LinearitasChart;