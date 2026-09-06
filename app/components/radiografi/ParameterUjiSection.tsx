"use client";

import Link from "next/link";

export interface ParameterUjiItem {
  label: string;
  href: string;
}

interface ParameterUjiSectionProps {
  items: ParameterUjiItem[];
  pathname: string;
}

export default function ParameterUjiSection({ items, pathname }: ParameterUjiSectionProps) {
  return (
    <div className="flex flex-row flex-wrap gap-1 w-full justify-center">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href.split("?")[0]);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`rounded-lg border text-sm transition-all ${
              isActive
                ? "px-3 py-1 bg-green-700 text-white border-green-700 shadow-lg shadow-green-300"
                : "px-2 py-1 bg-green-100 text-gray-400 border-green-700 hover:text-green-800 hover:underline"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
