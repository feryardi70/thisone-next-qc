"use client";

import EditDataUjiFloForm from "@/app/feature/components/FormEditDataUjiFlo";

interface RadProps {
  payloadQueryParams: {
    parameterId: number;
    email: string;
  };
}

export default function EditDataUjiFloComponent({ payloadQueryParams }: RadProps) {
  return <EditDataUjiFloForm payloadQueryParams={payloadQueryParams} />;
}
