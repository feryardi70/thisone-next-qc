import { saveDataRad, updateDataRadByIdSpec } from "../repository/spec-repository";

export const editDataRadByIdSpec = async(Merk: string, Model: string, No_Seri: string, jenis_pesawat: string, id_user: string, id_spesifikasi: string) => {
    const data = {
        Merk,
        Model,
        No_Seri,
        jenis_pesawat,
        userId: parseInt(id_user),
    }
    //console.log('body', data);

    const updateResponse = await updateDataRadByIdSpec(data, id_spesifikasi);
    const result = await updateResponse.json();

    return result;
}

export const insertDataRad = async(jenis_pesawat: string, Merk: string, Model: string, No_Seri: string, id_user: number) => {
    const data = {
        jenis_pesawat,
        Merk,
        Model,
        No_Seri,
        id_user,
    }
    //console.log('body', data);

    const saveResponse = await saveDataRad(data);
    const result = await saveResponse.json();

    return result;
}