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

interface CombinedDataPoint {
  x: string | Date;
  y: number;
  y1: number;
  y2: number;
}

interface ReproCombinedChartProps {
  dataPoints: CombinedDataPoint[];
}

const ReproCombinedChart = forwardRef<HTMLDivElement, ReproCombinedChartProps>(
  ({ dataPoints }, ref) => {
    const data = {
      datasets: [
        {
          label: "Reproduksibilitas Kerma",
          data: dataPoints.map((d) => ({ x: d.x, y: d.y })),
          borderColor: "blue",
          backgroundColor: "blue",
          yAxisID: "y",
          tension: 0.3,
          pointRadius: 5,
        },
        {
          label: "Reproduksibilitas kV",
          data: dataPoints.map((d) => ({ x: d.x, y: d.y1 })),
          borderColor: "green",
          backgroundColor: "green",
          yAxisID: "y",
          tension: 0.3,
          pointRadius: 5,
        },
        {
          label: "Reproduksibilitas Waktu",
          data: dataPoints.map((d) => ({ x: d.x, y: d.y2 })),
          borderColor: "rgb(34, 199, 94)",
          backgroundColor: "rgba(34, 199, 94, 0.3)",
          yAxisID: "y",
          tension: 0.3,
          pointRadius: 5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      scales: {
        x: {
          type: "time" as const,
          time: { unit: "day" as const },
          title: { display: true, text: "Tanggal Uji" },
          grid: { color: "#e5e7eb" },
        },
        y: {
          beginAtZero: false,
          title: { display: true, text: "Nilai Reproduksibilitas" },
          grid: { color: "#e5e7eb" },
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
        },
        annotation: {
          annotations: {
            upperLimit: {
              type: "line" as const,
              yMin: 0.05,
              yMax: 0.05,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [6, 6],
              yScaleID: "y",
              label: {
                display: true,
                content: ["NLU (0.05)"],
                position: "end" as const,
                backgroundColor: "rgba(255,0,0,0.8)",
                color: "white",
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
        className="bg-white shadow-md rounded-xl p-4 w-[85%] min-h-96 border border-green-700"
      >
        <Line data={data} options={options} />
      </div>
    );
  }
);

ReproCombinedChart.displayName = "ReproCombinedChart";
export default ReproCombinedChart;
