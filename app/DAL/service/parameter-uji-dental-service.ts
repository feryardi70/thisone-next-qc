import { saveDataUjiDentalIntraoral } from "../repository/parameter-uji-dental-repository";
import { updateDataUjiDentalIntraoralByIdParameter } from "../repository/parameter-uji-dental-repository";

export const insertDataUjiDentalIntraoral = async (
  Kolimasi_deltaX: string,
  Akurasi_kV: string,
  Akurasi_waktu: string,
  Linearitas: string,
  Reproduksibilitas: string,
  Reproduksibilitas_kV: string,
  Reproduksibilitas_waktu: string,
  HVL: string,
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
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  };
  //console.log("Data to be sent to external API:", data);

  const saveResponse = await saveDataUjiDentalIntraoral(data);
  const result = await saveResponse.json();

  return result;
};

export const editDataUjiDentalIntraoralByIdParameter = async (
  Kolimasi_deltaX: string,
  Akurasi_kV: string,
  Akurasi_waktu: string,
  Linearitas: string,
  Reproduksibilitas: string,
  Reproduksibilitas_kV: string,
  Reproduksibilitas_waktu: string,
  HVL: string,
  Tanggal_uji: string,
  id_user: number | string,
  id_spesifikasi: number | string,
  id_parameter: string
) => {
  const data = {
    deltaX: parseFloat(Kolimasi_deltaX),
    kV: parseFloat(Akurasi_kV),
    time: parseFloat(Akurasi_waktu),
    linear: parseFloat(Linearitas),
    repro: parseFloat(Reproduksibilitas),
    repro_kV: parseFloat(Reproduksibilitas_kV),
    repro_time: parseFloat(Reproduksibilitas_waktu),
    Qberkas: parseFloat(HVL),
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  };

  const updateResponse = await updateDataUjiDentalIntraoralByIdParameter(data, id_parameter);
  const result = await updateResponse.json();

  return result;
};
