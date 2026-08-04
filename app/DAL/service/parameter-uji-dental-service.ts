import { saveDataUjiDentalIntraoral } from "../repository/parameter-uji-dental-repository";

export const insertDataUjiDentalIntraoral = async (
  Kolimasi_deltaX: string,
  Akurasi_kV: string,
  Akurasi_waktu: string,
  Linearitas: string,
  Reproduksibilitas: string,
  Reproduksibilitas_kV: string,
  Reproduksibilitas_waktu: string,
  HVL: string,
  HVL_80: string,
  Tanggal_uji: string,
  id_user: number,
  id_spesifikasi: number
) => {
  const data = {
    Kolimasi_deltaX: parseFloat(Kolimasi_deltaX),
    Akurasi_kV: parseFloat(Akurasi_kV),
    Akurasi_waktu: parseFloat(Akurasi_waktu),
    Linearitas: parseFloat(Linearitas),
    Reproduksibilitas: parseFloat(Reproduksibilitas),
    Reproduksibilitas_kV: parseFloat(Reproduksibilitas_kV),
    Reproduksibilitas_waktu: parseFloat(Reproduksibilitas_waktu),
    HVL: parseFloat(HVL),
    HVL_80: parseFloat(HVL_80),
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  };

  const saveResponse = await saveDataUjiDentalIntraoral(data);
  const result = await saveResponse.json();

  return result;
};
