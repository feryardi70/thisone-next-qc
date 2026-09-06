import { ReactNode } from "react";

interface ReportChartSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ReportChartSection({ title, description, children }: ReportChartSectionProps) {
  return (
    <section className="report-page report-chart-section print:break-inside-avoid mb-8 last:mb-0">
      <header className="mb-4 pb-2 border-b border-emerald-200">
        <h2 className="text-xl font-bold text-emerald-800 uppercase tracking-wide">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-gray-600 italic mt-1">{description}</p>
        )}
      </header>
      <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm print:shadow-none print:border-gray-300">
        {children}
      </div>
    </section>
  );
}
