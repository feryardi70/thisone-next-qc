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

// ✅ Pakai forwardRef agar bisa direferensikan dari parent
const AkurWaktuChart = forwardRef<HTMLDivElement, PerformanceChartProps>(
  ({ dataPoints }, ref) => {
    const data = {
      datasets: [
        {
          label: "Akurasi Waktu (%)",
          data: dataPoints,
          borderColor: "rgb(37, 99, 235)", // biru
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
          title: { display: true, text: "% Error" },
          grid: { color: "#e5e7eb" },
        },
      },
      plugins: {
        annotation: {
          annotations: {
            upperLimit: {
              type: "line" as const,
              yMin: 10,
              yMax: 10,
              borderColor: "rgb(255, 0, 0)",
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                display: true,
                content: ["NLU (10%)"],
                position: "end" as const,
                backgroundColor: "rgba(255,0,0,0.8)",
                color: "rgb(255,255,255)",
                padding: 4,
                font: { weight: "bold" as const },
                clip: false,
              },
            },
          },
        },
      },
    };

    return (
      <div
        ref={ref}
        className="bg-white shadow-md rounded-xl p-4 w-[90%] min-h-96"
      >
        <Line data={data} options={options} />
      </div>
    );
  }
);

AkurWaktuChart.displayName = "AkurWaktuChart";
export default AkurWaktuChart;
