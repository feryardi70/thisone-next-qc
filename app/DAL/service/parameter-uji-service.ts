import { saveDataUji, updateDataUjiByIdParameter } from "../repository/parameter-uji-repository";

export const insertDataUji = async(Iluminasi: string, Kolimasi_deltaX: string, Kolimasi_deltaY: string, Akurasi_kV: string, Akurasi_waktu: string, Linearitas: string, Reproduksibilitas: string, HVL: string, Kebocoran: string, Tanggal_uji: string, id_user: number, id_spesifikasi: number) => {
    const data = {
        ilum: parseInt(Iluminasi),
        deltaX: parseFloat(Kolimasi_deltaX),
        deltaY: parseFloat(Kolimasi_deltaY),
        kV: parseFloat(Akurasi_kV),
        time: parseFloat(Akurasi_waktu),
        linear: parseFloat(Linearitas),
        repro: parseFloat(Reproduksibilitas),
        Qberkas: parseFloat(HVL),
        leakage: parseFloat(Kebocoran),
        Tanggal_uji,
        id_user,
        id_spesifikasi,
    }
    //console.log('body', data);

    const saveResponse = await saveDataUji(data);
    const result = await saveResponse.json();

    return result;
}

export const editDataUjiByIdParameter = async(Iluminasi: string, Kolimasi_deltaX: string, Kolimasi_deltaY: string, Akurasi_kV: string, Akurasi_waktu: string, Linearitas: string, Reproduksibilitas: string, HVL: string, Kebocoran: string, Tanggal_uji: string, id_user: number | string, id_spesifikasi: number | string, id_parameter: string) => {
    const data = {
        ilum: parseInt(Iluminasi),
        deltaX: parseFloat(Kolimasi_deltaX),
        deltaY: parseFloat(Kolimasi_deltaY),
        kV: parseFloat(Akurasi_kV),
        time: parseFloat(Akurasi_waktu),
        linear: parseFloat(Linearitas),
        repro: parseFloat(Reproduksibilitas),
        Qberkas: parseFloat(HVL),
        leakage: parseFloat(Kebocoran),
        Tanggal_uji,
        id_user,
        id_spesifikasi,
    }
    //console.log('body', data);

    const updateResponse = await updateDataUjiByIdParameter(data, id_parameter);
    const result = await updateResponse.json();

    return result;
}