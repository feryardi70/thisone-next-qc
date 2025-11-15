"use client";

import React, { forwardRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  annotationPlugin
);

interface DataPoint {
  x: string; // format ISO string
  y: number;
  y1: number;
}

interface DualAxisChartProps {
  data: DataPoint[];
}

const DualAxisChart = forwardRef<HTMLDivElement, DualAxisChartProps>(
  ({ data }, ref) => {
    const chartData = {
      labels: data.map((d) => d.x),
      datasets: [
        {
          label: "Kolimasi ΔX",
          data: data.map((d) => d.y),
          borderColor: "blue",
          backgroundColor: "blue",
          yAxisID: "y",
        },
        {
          label: "Kolimasi ΔY",
          data: data.map((d) => d.y1),
          borderColor: "green",
          backgroundColor: "green",
          yAxisID: "y1",
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
      stacked: false,
      plugins: {
        legend: { position: "top" as const },
        title: { display: false },
        annotation: {
          annotations: {
            upperLimitY: {
              type: "line" as const,
              yMin: 2,
              yMax: 2,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [6, 6],
              yScaleID: "y",
              label: {
                display: true,
                content: "NLU = 2 (%SID)",
                position: "end" as const,
                backgroundColor: "rgba(255,0,0,0.8)",
                color: "white",
                padding: 4,
                font: { size: 12, weight: "bold" as const },
              },
            },
            upperLimitY1: {
              type: "line" as const,
              yMin: 2,
              yMax: 2,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [6, 6],
              yScaleID: "y1",
              label: {
                display: true,
                content: "NLU = 2 (%SID)",
                position: "end" as const,
                backgroundColor: "rgba(255,0,0,0.8)",
                color: "white",
                padding: 4,
                font: { size: 12, weight: "bold" as const },
              },
            },
          },
        },
      },
      scales: {
        x: {
          type: "time" as const,
          time: { unit: "day" as const },
          title: { display: true, text: "Tanggal Uji" },
        },
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          title: { display: true, text: "Kolimasi ΔX" },
        },
        y1: {
          type: "linear" as const,
          display: true,
          position: "right" as const,
          grid: { drawOnChartArea: false },
          title: { display: true, text: "Kolimasi ΔY" },
        },
      },
    };

    return (
      <div
        ref={ref} // ✅ ref diarahkan ke elemen DOM ini
        className="bg-white shadow-md rounded-xl p-4 w-[85%] min-h-96 border border-green-700"
      >
        <Line options={options} data={chartData} />
      </div>
    );
  }
);

DualAxisChart.displayName = "DualAxisChart";

export default DualAxisChart;
