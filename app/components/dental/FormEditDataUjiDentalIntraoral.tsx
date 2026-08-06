"use client";

import EditDataUjiDentalIntraoralForm from "@/app/feature/components/FormEditDataUjiDentalIntraoral";

interface RadProps {
  payloadQueryParams: {
    parameterId: number;
    email: string;
  };
}

export default function EditDataUjiDentalIntraoralComponent({ payloadQueryParams }: RadProps) {
  return <EditDataUjiDentalIntraoralForm payloadQueryParams={payloadQueryParams} />;
}
