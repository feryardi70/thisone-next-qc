"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, X } from "lucide-react";
import { generateAIReport } from "../DAL/repository/ai-report-repository";
import AIReportPDF from "./pdf/AIReportPDF";

interface AIReportModalProps {
  open: boolean;
  onClose: () => void;
  id_user: number;
  id_spesifikasi: number;
  startDate: string;
  endDate: string;
}

export default function AIReportModal({
  open,
  onClose,
  id_user,
  id_spesifikasi,
  startDate,
  endDate,
}: AIReportModalProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("1. Calling generateAIReport...");
      const { markdown, qcData, machine } = await generateAIReport(
        prompt, id_user, id_spesifikasi, startDate, endDate
      );
      console.log("2. Markdown length:", markdown.length, "QC rows:", (qcData as Record<string, unknown>[]).length);

      console.log("3. Generating PDF blob...");
      const blob = await pdf(
        <AIReportPDF
          markdown={markdown}
          qcData={qcData as Record<string, unknown>[]}
          machine={machine as { Merk?: string; Model?: string; No_Seri?: string; jenis_pesawat?: string } | null}
          startDate={startDate}
          endDate={endDate}
        />
      ).toBlob();
      console.log("4. Blob size:", blob.size, "bytes, type:", blob.type);

      const url = URL.createObjectURL(blob);
      console.log("5. Blob URL created:", url);

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("6. Link clicked, waiting 60s then revoking URL");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);

      setPrompt("");
      onClose();
    } catch (err) {
      console.error("AI report generation failed:", err);
      setError(err instanceof Error ? err.message : "Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-50 w-full max-w-lg bg-white dark:bg-gray-900 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg shadow-xl">
        <div className="flex items-center justify-between bg-emerald-100 dark:bg-emerald-900/60 border-b-2 border-emerald-300 dark:border-emerald-700 px-6 py-4 rounded-t-md">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-100">
            <Sparkles size={20} />
            <h2 className="text-lg font-semibold">Create Report with AI</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Describe what you want in the report. The AI will analyze the QC data for <strong>{startDate}</strong> to <strong>{endDate}</strong> and generate a PDF.
          </p>

          <Textarea
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); setError(""); }}
            placeholder="e.g., Generate a summary report highlighting any parameters that are outside acceptable range, with recommendations..."
            rows={5}
            className="resize-none"
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
