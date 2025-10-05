"use client";

import Link from "next/link";
import { SignOut } from "../Signout-button";
import SideBar from "../Sidebar";
import PerformanceChart from "../PerformanceAkurKVData";
import { useState, useEffect } from "react";
import { RenderRadModality } from "../../feature/components/renderRadModality";

interface Machine {
  email: string;
  id_user: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Akurasi_kV: number;
  Tanggal_uji: string;
}

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export default function DashboardKolim({ payloadQueryParams }: DashboardRadProps) {
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine[]>([]);

  const fetchDataUji = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/qc/radiografi/akurasi-kv/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
      );
      const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUji();
  }, []);

  const identifikasiPesawat = allDataUji.map(
    ({ id_user, Merk, Model, No_Seri }) => ({
      id_user,
      Merk,
      Model,
      No_Seri,
    })
  );

  const identifikasiPesawatUnik = identifikasiPesawat.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.id_user === value.id_user &&
          t.Merk === value.Merk &&
          t.Model === value.Model &&
          t.No_Seri === value.No_Seri
      )
  );
  //console.log(identifikasiPesawatUnik);
  const renderParameterUji = () => {
    return (
    <div className="flex flex-row gap-1">
      <Link href={`/dashboard/`} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Iluminasi</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/kolimasi/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Kolimasi</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/akurasi-kvp/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Akurasi kVp</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/akurasi-waktu/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Akurasi Waktu</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/linearitas/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Linearitas</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/reproduksibilitas/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Reproduksibilitas</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/hvl/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>HVL</small>
      </Link>
      <Link href={identifikasiPesawatUnik[0] ? `/dashboard/radiografi/kebocoran-tabung/?id_user=${identifikasiPesawatUnik[0].id_user}&No_Seri=${identifikasiPesawatUnik[0].No_Seri}` : '#'} className="py-2 px-2 rounded-lg bg-green-800 text-white">
        <small>Kebocoran Tabung</small>
      </Link>
    </div>);
  };

  const performanceData = dataUji.map(({ Tanggal_uji, Akurasi_kV }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Akurasi_kV,
  }));
  console.log(performanceData);
  
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b-2 flex items-center justify-between px-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-green-900 tracking-tight">
              Airport Dashboard
            </h1>

            <SignOut />
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-green-100">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Overview</h2>
            {/* <div>Email: {currentEmail}</div> */}
            <div className="flex flex-row gap-1 mb-1">
              <div className="p-4 bg-green-800 text-white">
                Radiografi Umum/Mobile
              </div>
              <div className="p-4 bg-green-800 text-yellow-300">Fluroskopi</div>
              <div className="p-4 bg-green-800 text-blue-400">CT Scan</div>
              <div className="p-4 bg-green-800 text-orange-400">Dental</div>
              <div className="p-4 bg-green-800 text-fuchsia-400">
                Mammografi
              </div>
            </div>

            <div className="flex flex-row gap-1 mb-1"><RenderRadModality data={identifikasiPesawatUnik} /></div>
            <div>{renderParameterUji()}</div>

            <div className="flex flex-col items-center p-8 gap-1">
              <h1 className="text-2xl font-bold">Akurasi kV Tren</h1>
              <p>
                <small>
                  {dataUji[0]
                    ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}`
                    : "Loading..."}
                </small>
              </p>
              <PerformanceChart dataPoints={performanceData || []} />
            </div>

            {/* Cards */}
            <div className="mt-5 flex justify-center items-center gap-10 flex-wrap">
              <div className="w-96 h-72 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-black transition">
                <Link href="/departure" aria-label="departure">
                  {/* <Image src="/img/departure2.jpg" alt="departure" width={600} height={300} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" /> */}
                  <h3 className="text-center text-xl text-white bg-green-600 py-3">
                    <div className="inline-block hover:border-b hover:border-t-2">
                      Manage Departure
                    </div>
                  </h3>
                </Link>
              </div>
              <div className="w-96 h-72 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-black transition">
                <Link href="/arrival" aria-label="arrival">
                  {/* <Image src='/img/arrival2.jpg' alt="arrival" width={600} height={300} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" /> */}

                  <h3 className="text-center text-xl text-white bg-green-600 py-3">
                    <div className="inline-block hover:border-b hover:border-t-2">
                      Manage Arrival
                    </div>
                  </h3>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
