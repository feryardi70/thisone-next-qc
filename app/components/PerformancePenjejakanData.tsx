"use client";

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
import { forwardRef } from "react";

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

const PenjejakanChart = forwardRef<HTMLDivElement, DualAxisChartProps>(
  ({ data }, ref) => {
  const chartData = {
    labels: data.map((d) => d.x),
    datasets: [
      {
        label: "Penjejakan Ketebalan",
        data: data.map((d) => d.y),
        borderColor: "blue",
        backgroundColor: "blue",
        yAxisID: "y",
      },
      {
        label: "Penjejakan kV",
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
        text: "Penjejakan vs Tanggal",
      },
      annotation: {
        annotations: {
          upperLimitY: {
            type: "line" as const,
            yMin: 10,
            yMax: 10,
            borderColor: "blue",
            borderWidth: 2,
            borderDash: [6, 6],
            yScaleID: "y", // pakai axis kanan (Akurasi_kV)
            label: {
              display: true,
              content: "NLU (10%)",
              position: "start" as const,
              backgroundColor: "rgba(0,0,255,0.8)",
              color: "white",
              padding: 4,
              font: { size: 12, weight: "bold" as const },
            },
          },
          upperLimitY1: {
            type: "line" as const,
            yMin: 15,
            yMax: 15,
            borderColor: "green",
            borderWidth: 2,
            borderDash: [6, 6],
            yScaleID: "y1", // pakai axis kanan (Akurasi_kV)
            label: {
              display: true,
              content: "NLU (15%)",
              position: "end" as const, 
              backgroundColor: "rgba(0,255,0,0.8)",
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
        title: { display: true, text: "Penjejakan Ketebalan" },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Penjejakan kV" },
      },
    },
  };

  return (
    <div ref={ref} className="bg-white shadow-md rounded-xl p-4 w-[85%] min-h-96 border border-green-700">
      <Line options={options} data={chartData} />
    </div>
  );
}
);

PenjejakanChart.displayName = "PenjejakanChart";
export default PenjejakanChart;
