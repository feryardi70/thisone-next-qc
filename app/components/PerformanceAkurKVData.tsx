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

const AkurKVChart = forwardRef<HTMLDivElement, PerformanceChartProps>(
  ({ dataPoints }, ref) => {
    const data = {
      datasets: [
        {
          label: "Akurasi kV (%)",
          data: dataPoints,
          borderColor: "rgb(37, 99, 235)", // ✅ safe RGB
          backgroundColor: "rgba(37, 99, 235, 0.3)", // ✅ safe RGBA
          fill: false,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: "rgb(37, 99, 235)", // ✅ prevent auto lab() color
          pointBorderColor: "rgb(37, 99, 235)",
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
          title: { display: true, text: "Tanggal", color: "#111" }, // ✅ plain color
          grid: { color: "#e5e7eb" },
          ticks: { color: "#111" },
        },
        y: {
          beginAtZero: false,
          title: { display: true, text: "% Error", color: "#111" },
          grid: { color: "#e5e7eb" },
          ticks: { color: "#111" },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#111", // ✅ avoid lab() conversion
          },
        },
        tooltip: {
          enabled: true,
        },
        annotation: {
          annotations: {
            upperLimit: {
              type: "line" as const,
              yMin: 10,
              yMax: 10,
              borderColor: "rgb(255, 0, 0)", // ✅ RGB not "red"
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                display: true,
                content: ["NLU (10%)"],
                position: "end" as const,
                backgroundColor: "rgba(255, 0, 0, 0.8)", // ✅ RGBA
                color: "rgb(255, 255, 255)", // ✅ safe white
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
      <div
        ref={ref}
        className="bg-white shadow-md rounded-xl p-4 w-[88%] min-h-96 border border-green-700"
      >
        <Line data={data} options={options} />
      </div>
    );
  }
);

AkurKVChart.displayName = "AkurKVChart";

export default AkurKVChart;
