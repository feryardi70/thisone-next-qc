"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
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
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const palette = isDark
      ? {
          bg: "#0f172a",
          border: "#334155",
          grid: "rgba(148, 163, 184, 0.25)",
          text: "#e2e8f0",
          line: "rgb(74, 222, 128)",
          fill: "rgba(74, 222, 128, 0.18)",
          annotation: "rgb(248, 113, 113)",
        }
      : {
          bg: "#ffffff",
          border: "#15803d",
          grid: "#e5e7eb",
          text: "#111827",
          line: "rgb(34, 199, 94)",
          fill: "rgba(37, 99, 235, 0.3)",
          annotation: "rgb(255, 0, 0)",
        };

    const data = {
      datasets: [
        {
          label: "Iluminasi (lux)",
          data: dataPoints,
          borderColor: palette.line,
          backgroundColor: palette.fill,
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
          title: { display: true, text: "Tanggal", color: palette.text },
          ticks: { color: palette.text },
          grid: { color: palette.grid },
        },
        y: {
          beginAtZero: false,
          title: { display: true, text: "Iluminasi", color: palette.text },
          ticks: { color: palette.text },
          grid: { color: palette.grid },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: palette.text,
          },
        },
        tooltip: {
          titleColor: palette.text,
          bodyColor: palette.text,
          backgroundColor: isDark ? "#111827" : "#ffffff",
          borderColor: isDark ? "#475569" : "#d1d5db",
          borderWidth: 1,
          callbacks: {
            title: (items: TooltipItem<"line">[]) => {
              const item = items[0];
              const rawValue: number | string | Date | undefined | null =
                (item as any)?.parsed?.x ?? (item as any)?.label;

              if (rawValue === undefined || rawValue === null || rawValue === "") {
                return "";
              }

              const date =
                typeof rawValue === "number"
                  ? new Date(rawValue)
                  : rawValue instanceof Date
                    ? rawValue
                    : new Date(String(rawValue));

              if (Number.isNaN(date.getTime())) return String(rawValue);

              return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(date);
            },
            label: (context: TooltipItem<"line">) => `Iluminasi: ${context.parsed.y} lux`,
          },
        },
        annotation: {
          annotations: {
            upperLimit: {
              type: "line" as const,
              yMin: 100,
              yMax: 100,
              borderColor: palette.annotation,
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
        className={
          isDark
            ? "bg-slate-900 shadow-md rounded-xl p-4 w-[88%] min-h-96 border border-slate-700"
            : "bg-white shadow-md rounded-xl p-4 w-[88%] min-h-96 border border-green-700"
        }
      >
        <Line data={data} options={options} />
      </div>
    );
  }
);

// Tambahkan displayName agar tidak warning di React DevTools
IluminasiChart.displayName = "IluminasiChart";

export default IluminasiChart;
