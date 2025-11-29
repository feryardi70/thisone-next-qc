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
  x: string;
  y: number;
  y1: number;
}

interface DualAxisChartProps {
  data: DataPoint[];
}

const HVLChart = forwardRef<HTMLDivElement, DualAxisChartProps>(
  ({ data }, ref) => {
  const chartData = {
    labels: data.map((d) => d.x),
    datasets: [
      {
        label: "HVL 70kV",
        data: data.map((d) => d.y),
        borderColor: "blue",
        backgroundColor: "blue",
        yAxisID: "y",
      },
      {
        label: "HVL 80kV",
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
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "HVL vs Tanggal",
      },
      annotation: {
        annotations: {
          upperLimitY: {
            type: "line" as const,
            yMin: 2.1,
            yMax: 2.1,
            borderColor: "blue",
            borderWidth: 2,
            borderDash: [6, 6],
            yScaleID: "y", 
            label: {
              display: true,
              content: "NLU (2.1 mmAl)",
              position: "start" as const,
              backgroundColor: "rgba(0,0,255,0.8)",
              color: "white",
              padding: 4,
              font: { size: 12, weight: "bold" as const },
            },
          },
          upperLimitY1: {
            type: "line" as const,
            yMin: 2.3,
            yMax: 2.3,
            borderColor: "green",
            borderWidth: 2,
            borderDash: [6, 6],
            yScaleID: "y1", 
            label: {
              display: true,
              content: "NLU (2.3 mmAl)",
              position: "end" as const, 
              backgroundColor: "rgba(0,255,0,1)",
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
        time: { unit: "day" as "day" }, // eslint-disable-line @typescript-eslint/prefer-as-const
        title: {
          display: true,
          text: "Tanggal Uji",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: { display: true, text: "HVL 70kV" },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: { drawOnChartArea: false },
        title: { display: true, text: "HVL 80kV" },
      },
    },
  };

  return (
    <div ref={ref} className="bg-white shadow-md rounded-xl p-4 w-[88%] min-h-96 border border-green-700">
      <Line options={options} data={chartData} />
    </div>
  );
}
);

HVLChart.displayName = "HVLChart";
export default HVLChart;


