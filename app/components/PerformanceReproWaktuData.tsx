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

const ReproWaktuChart = forwardRef<HTMLDivElement, PerformanceChartProps>(
  ({ dataPoints }, ref) => {
  const data = {
    datasets: [
      {
        label: "Reproduksibilitas Waktu",
        data: dataPoints,
        borderColor: "rgb(34, 199, 94)", // blue-600
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
        title: { display: true, text: "Reproduksibilitas Waktu" },
        grid: { color: "#e5e7eb" },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          upperLimit: {
            type: "line" as const,
            yMin: 0.05,
            yMax: 0.05,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true, // ✅ wajib supaya muncul
              content: ["NLU (0.05)"], // bisa array untuk multiline
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
    <div ref={ref} className="w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow min-h-80">
      <Line data={data} options={options} />
    </div>
  );
}
);

ReproWaktuChart.displayName = "ReproWaktuChart";
export default ReproWaktuChart;
