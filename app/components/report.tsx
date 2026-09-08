"use client";

import SideBar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, Sparkles } from "lucide-react";
import { useFetchDataRadBySpecId } from "../DAL/service/spec-client-service";
import SpinnerCss from "./spinner-css";
import AIReportModal from "./AIReportModal";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    email: string;
  };
}

export default function ReportPerMachine({ payloadQueryParams }: RadProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);

  const { dataRad, isLoading, errorMsg } = useFetchDataRadBySpecId({ payloadQueryParams });
  const id_user = dataRad[0]?.id_user;
  const id_spesifikasi = dataRad[0]?.id_spesifikasi;

  const isParamsReady = !isLoading && id_user && id_spesifikasi;

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!startDate) newErrors.push("Start date is required");
    if (!endDate) newErrors.push("End date is required");
    if (startDate && endDate && startDate > endDate) newErrors.push("Start date must be before end date");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleOpenReport = () => {
    const params = new URLSearchParams({
      id_user: String(id_user),
      id_spesifikasi: String(id_spesifikasi),
      start_date: startDate,
      end_date: endDate,
    });
    window.open(`/radiografi/report/print?${params.toString()}`, "_blank");
  };

  const handleGenerate = () => {
    if (!validate()) return;
    handleOpenReport();
  };

  const handleAIClick = () => {
    if (!validate()) return;
    setShowAIModal(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-linear-to-b from-green-200 to-green-300 dark:from-green-950 dark:to-gray-950">
      <SideBar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header email={payloadQueryParams.email} />

        <main className="flex-1 p-4 mt-2 overflow-y-auto">
          <div className="flex flex-col items-center gap-6">
            {errorMsg.length > 0 && (
              <div className="w-full max-w-lg flex items-center gap-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm">{errorMsg}</span>
              </div>
            )}

            <div className="w-full max-w-lg border-2 border-emerald-300 dark:border-emerald-700 rounded-lg overflow-hidden bg-white dark:bg-green-900/50">
              <div className="bg-emerald-100 dark:bg-emerald-900/60 border-b-2 border-emerald-300 dark:border-emerald-700 px-6 py-4">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-100">
                  <FileText size={22} />
                  <h1 className="text-xl font-semibold">Reporting Page</h1>
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-1">Select a date range to generate the QC report</p>
              </div>

              <div className="p-6">
                <div className="flex items-end gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Start Date</label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => { setStartDate(e.target.value); setErrors([]); }}
                      className="pl-1 w-fit"
                    />
                  </div>

                  <span className="-ml-31.25 pb-2 text-sm text-gray-500 dark:text-gray-400 font-medium">to</span>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">End Date</label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => { setEndDate(e.target.value); setErrors([]); }}
                      className="pl-1 w-fit"
                    />
                  </div>
                </div>

                {errors.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errors.join(". ")}</span>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  {isLoading ? (
                    <SpinnerCss />
                  ) : (
                    <>
                      <Button
                        onClick={handleGenerate}
                        disabled={!isParamsReady}
                        size="lg"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white"
                      >
                        <FileText size={18} />
                        Open Report
                      </Button>
                      <Button
                        onClick={handleAIClick}
                        disabled={!isParamsReady}
                        size="lg"
                        variant="outline"
                        className="w-full border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                      >
                        <Sparkles size={18} />
                        Create Report with AI
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AIReportModal
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        id_user={id_user}
        id_spesifikasi={id_spesifikasi}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
