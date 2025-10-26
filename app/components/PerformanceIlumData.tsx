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

const IluminasiChart = forwardRef<HTMLDivElement, PerformanceChartProps>(
  ({ dataPoints }, ref) => {
    const data = {
      datasets: [
        {
          label: "Iluminasi (lux)",
          data: dataPoints,
          borderColor: "rgb(34, 199, 94)",
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
          title: { display: true, text: "Iluminasi" },
          grid: { color: "#e5e7eb" },
        },
      },
      plugins: {
        annotation: {
          annotations: {
            upperLimit: {
              type: "line" as const,
              yMin: 100,
              yMax: 100,
              borderColor: "rgb(255, 0, 0)",
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                display: true,
                content: ["NLU (100 lux)"],
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
        className="bg-white shadow-md rounded-xl p-4 w-[90%] min-h-96 border border-green-700"
      >
        <Line data={data} options={options} />
      </div>
    );
  }
);

// Tambahkan displayName agar tidak warning di React DevTools
IluminasiChart.displayName = "IluminasiChart";

export default IluminasiChart;
