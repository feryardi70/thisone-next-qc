import { saveDataUji, updateDataUjiByIdParameter } from "../repository/parameter-uji-repository";

export const insertDataUji = async(Iluminasi: string, Kolimasi_deltaX: string, Kolimasi_deltaY: string, Ketegaklurusan: string, Akurasi_kV: string, Akurasi_waktu: string, Linearitas: string, Reproduksibilitas: string, Reproduksibilitas_kV: string, Reproduksibilitas_waktu: string, HVL: string, HVL_80: string, Kebocoran: string, Timer_darurat_mAs: string, Timer_darurat_s: string, Uniformitas_mAs: string, Uniformitas_EI: string, Penjejakan_ketebalan: string, Penjejakan_kV: string, Penjejakan_kombinasi: string, Waktu_respon_min: string, Tanggal_uji: string, id_user: number, id_spesifikasi: number) => {
    const data = {
        ilum: parseInt(Iluminasi),
        deltaX: parseFloat(Kolimasi_deltaX),
        deltaY: parseFloat(Kolimasi_deltaY),
        Ketegaklurusan,
        kV: parseFloat(Akurasi_kV),
        time: parseFloat(Akurasi_waktu),
        linear: parseFloat(Linearitas),
        repro: parseFloat(Reproduksibilitas),
        repro_kV: parseFloat(Reproduksibilitas_kV),
        repro_time: parseFloat(Reproduksibilitas_waktu),
        Qberkas: parseFloat(HVL),
        Qberkas_80: parseFloat(HVL_80),
        leakage: parseFloat(Kebocoran),
        Timer_darurat_mAs: parseFloat(Timer_darurat_mAs),
        Timer_darurat_s: parseFloat(Timer_darurat_s),
        Uniformitas_mAs: parseFloat(Uniformitas_mAs),
        Uniformitas_EI: parseFloat(Uniformitas_EI),
        Penjejakan_ketebalan: parseFloat(Penjejakan_ketebalan),
        Penjejakan_kV: parseFloat(Penjejakan_kV),
        Penjejakan_kombinasi: parseFloat(Penjejakan_kombinasi),
        Waktu_respon_min: parseFloat(Waktu_respon_min),
        Tanggal_uji,
        id_user,
        id_spesifikasi,
    }
    //console.log('body', data);

    const saveResponse = await saveDataUji(data);
    const result = await saveResponse.json();

    return result;
}

export const editDataUjiByIdParameter = async(Iluminasi: string, Kolimasi_deltaX: string, Kolimasi_deltaY: string, Ketegaklurusan: string, Akurasi_kV: string, Akurasi_waktu: string, Linearitas: string, Reproduksibilitas: string, Reproduksibilitas_kV: string, Reproduksibilitas_waktu: string, HVL: string, HVL_80: string, Kebocoran: string, Timer_darurat_mAs: string, Timer_darurat_s: string, Uniformitas_mAs: string, Uniformitas_EI: string, Penjejakan_ketebalan: string, Penjejakan_kV: string, Penjejakan_kombinasi: string, Waktu_respon_min: string, Tanggal_uji: string, id_user: number | string, id_spesifikasi: number | string, id_parameter: string) => {
    const data = {
        ilum: parseInt(Iluminasi),
        deltaX: parseFloat(Kolimasi_deltaX),
        deltaY: parseFloat(Kolimasi_deltaY),
        Ketegaklurusan,
        kV: parseFloat(Akurasi_kV),
        time: parseFloat(Akurasi_waktu),
        linear: parseFloat(Linearitas),
        repro: parseFloat(Reproduksibilitas),
        repro_kV: parseFloat(Reproduksibilitas_kV),
        repro_time: parseFloat(Reproduksibilitas_waktu),
        Qberkas: parseFloat(HVL),
        Qberkas_80: parseFloat(HVL_80),
        leakage: parseFloat(Kebocoran),
        Timer_darurat_mAs: parseFloat(Timer_darurat_mAs),
        Timer_darurat_s: parseFloat(Timer_darurat_s),
        Uniformitas_mAs: parseFloat(Uniformitas_mAs),
        Uniformitas_EI: parseFloat(Uniformitas_EI),
        Penjejakan_ketebalan: parseFloat(Penjejakan_ketebalan),
        Penjejakan_kV: parseFloat(Penjejakan_kV),
        Penjejakan_kombinasi: parseFloat(Penjejakan_kombinasi),
        Waktu_respon_min: parseFloat(Waktu_respon_min),
        Tanggal_uji,
        id_user,
        id_spesifikasi,
    }
    //console.log('body', data);

    const updateResponse = await updateDataUjiByIdParameter(data, id_parameter);
    const result = await updateResponse.json();

    return result;
}