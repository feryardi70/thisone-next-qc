"use client";

import type { ComponentType } from "react";

export interface DataPoint {
  x: string;
  y: number;
}

interface ChartSectionProps {
  title: string;
  subtitle?: string;
  dataUji?: { Merk?: string; Model?: string; No_Seri?: string }[];
  performanceData: DataPoint[];
  chartComponent: ComponentType<{ dataPoints: DataPoint[] }>;
  variant?: "dark" | "light";
}

export default function ChartSection({
  title,
  subtitle,
  dataUji,
  performanceData,
  chartComponent: ChartComponent,
  variant = "dark",
}: ChartSectionProps) {
  const containerClass = variant === "dark" ? "mt-4 flex flex-col items-center p-8 gap-1 dark:text-white" : "mt-4 flex flex-col items-center p-8 gap-1";
  const smallClass = variant === "dark" ? "italic" : "";

  const derivedSubtitle = subtitle ?? (dataUji?.[0] ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}` : "Loading...");

  const Chart = ChartComponent;

  return (
    <div className={containerClass}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>
        <small className={smallClass}>{derivedSubtitle}</small>
      </p>
      <div className="md:hidden">Unsupported Chart</div>
      <Chart dataPoints={performanceData} />
    </div>
  );
}
