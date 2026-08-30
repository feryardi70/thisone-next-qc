"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface TabColumn<T> {
  key: string;
  label: string;
  fields: readonly (keyof T & string)[];
}

interface TabbedDataTableProps<T> {
  data: T[];
  columns: TabColumn<T>[];
  fieldLabels: Record<string, string>;
  keyField: keyof T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function TabbedDataTable<T>({
  data,
  columns,
  fieldLabels,
  keyField,
  onEdit,
  onDelete,
}: TabbedDataTableProps<T>) {
  const [activeTab, setActiveTab] = useState(columns[0]?.key || "");

  const activeColumn = columns.find((col) => col.key === activeTab);

  return (
    <div className="border-2 border-emerald-300 rounded-lg overflow-hidden bg-white dark:bg-green-900">
      {/* Tab Buttons */}
      <div className="flex flex-wrap bg-emerald-100 border-b-2 border-emerald-300">
        {columns.map((col) => (
          <button
            key={col.key}
            onClick={() => setActiveTab(col.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === col.key
                ? "bg-emerald-500 text-white"
                : "text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-emerald-50 dark:bg-emerald-200">
              <tr>
                <th className="px-3 py-2 text-center w-10">#</th>
                {activeColumn?.fields.map((field) => (
                  <th key={field} className="px-3 py-2 text-left whitespace-nowrap">
                    {fieldLabels[field] || field}
                  </th>
                ))}
                <th className="px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={String(item[keyField])}
                  className="border-b border-emerald-100 hover:bg-emerald-50 dark:text-white"
                >
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  {activeColumn?.fields.map((field) => (
                    <td key={field} className="px-3 py-2">
                      {String(item[field] ?? "")}
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
