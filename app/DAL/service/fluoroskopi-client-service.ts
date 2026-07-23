import { useState, useEffect } from "react";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

interface Machine1st {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Kolimasi_deltaX: number;
  Tanggal_uji: string;
}
