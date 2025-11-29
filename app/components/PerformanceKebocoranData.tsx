"use client";

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

export default function IluminasiChart({
  dataPoints,
}: PerformanceChartProps) {
  const data = {
    datasets: [
      {
        label: "kebocoran (mGy/jam)",
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
        title: { display: true, text: "Kebocoran" },
        grid: { color: "#e5e7eb" },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          upperLimit: {
            type: "line" as const,
            yMin: 1,
            yMax: 1,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true, // ✅ wajib supaya muncul
              content: ["NLU (1)"], // bisa array untuk multiline
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
    <div className="bg-white shadow-md rounded-xl p-4 w-[88%] min-h-96 border border-green-700">
      <Line data={data} options={options} />
    </div>
  );
}
