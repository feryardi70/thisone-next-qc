import { saveDataUjiFlo } from "@/app/DAL/repository/parameter-uji-flo-repository";

export const insertDataUjiFlo = async (
  Kolimasi_deltaX: string,
  Kolimasi_deltaY: string,
  Titik_pusat: string,
  Akurasi_kV: string,
  Waktu_Fluoroskopik: string,
  HVL: string,
  HVL_80: string,
  Esd: string,
  Dmax: string,
  Dmax_high: string,
  Input_II_a: string,
  Input_II_b: string,
  Input_II_c: string,
  Low_contrast: string,
  High_contrast_d1: string,
  High_contrast_d2: string,
  High_contrast_d3: string,
  High_contrast_d4: string,
  High_contrast_d5: string,
  High_contrast_d6: string,
  Tanggal_uji: string,
  id_user: number,
  id_spesifikasi: number
) => {
  const data = {
    ASX: parseFloat(Kolimasi_deltaX),
    deviasi_ASX_AEM: parseFloat(Kolimasi_deltaY),
    jarak_pusat: parseFloat(Titik_pusat),
    kV: parseFloat(Akurasi_kV),
    timer_flo: parseFloat(Waktu_Fluoroskopik),
    Qberkas: parseFloat(HVL),
    Qberkas_80: parseFloat(HVL_80),
    ESD: parseFloat(Esd),
    Dmax_normal: parseFloat(Dmax),
    Dmax_high: parseFloat(Dmax_high),
    Input_II_a: parseFloat(Input_II_a),
    Input_II_b: parseFloat(Input_II_b),
    Input_II_c: parseFloat(Input_II_c),
    Low_contrast: parseFloat(Low_contrast),
    High_contrast_d1: parseFloat(High_contrast_d1),
    High_contrast_d2: parseFloat(High_contrast_d2),
    High_contrast_d3: parseFloat(High_contrast_d3),
    High_contrast_d4: parseFloat(High_contrast_d4),
    High_contrast_d5: parseFloat(High_contrast_d5),
    High_contrast_d6: parseFloat(High_contrast_d6),
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  };

  const saveResponse = await saveDataUjiFlo(data);
  const result = await saveResponse.json();

  return result;
};
