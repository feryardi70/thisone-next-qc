'use client'

import EditDataUjiForm from "@/app/feature/components/FormEditDataUji";

interface RadProps {
  payloadQueryParams: {
    parameterId: number;
    email: string;
  };
}

export default function EditDataUjiComponent({ payloadQueryParams }: RadProps) {
  return(
    <EditDataUjiForm payloadQueryParams={payloadQueryParams}/>
  )
}