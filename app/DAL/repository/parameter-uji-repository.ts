import { baseUrl, externalApiUrl } from "@/app/lib/constant";

export const addDataUji = async (dataUjiData: any) => {
  const saveResponse = await fetch(`${baseUrl}/qc/radiografi/parameter-uji`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUjiData),
  });
  const response = await saveResponse.json();

  return { saveResponse, response};
};

export const saveDataUji = async (data: any) => {
  const saveResponse = await fetch(
    `${externalApiUrl}/qc-data-radiografi/parameter-uji`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return saveResponse;
};

export const updateDataUjiByIdParameter = async (data: any, id_parameter: any) => {
  const updateResponse = await fetch(`${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
    });

  return updateResponse;
};

export const getDataUjiByIdParameter = async(id_parameter: number) => {
  const response = await fetch(
          `${baseUrl}/qc/radiografi/parameter-uji/${id_parameter}`
        );
  const data = await response.json();

  return data;
}

export const deleteDataUjiByIdParameter = async(selectedParameterId: number | null) => {
  const response = await fetch(
        `${baseUrl}/qc/radiografi/parameter-uji/${selectedParameterId}`,
        {
          method: "DELETE",
        }
  );

  return response;
}

export const readDataUjiByIdParameter = async(id_parameter: string | number) => {
  const response = await fetch(`${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`);
  const dataUji = await response.json();

  return dataUji;
}

export const removeDataUjiByIdParameter = async(id_parameter: string | number) => {
  const result = await fetch(`${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`, {
        method: 'DELETE',
  });
  const deletedData = await result.json();

  return deletedData;
}

export const editDataUjiByIdParameter = async(dataUjiData: any) => {
  const editResponse = await fetch(`${baseUrl}/qc/radiografi/parameter-uji`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUjiData),
    });
    const editResult = await editResponse.json();

    return { editResponse, editResult }
}
