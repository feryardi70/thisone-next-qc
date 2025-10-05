'use client'

import EditDataRadForm from "@/app/feature/components/FormEditDataRad";

interface RadProps {
  payloadQueryParams: {
    No_Seri: string;
    email: string;
  };
}

export default function EditDataRadComponent({ payloadQueryParams }: RadProps) {
  return(
    <EditDataRadForm payloadQueryParams={payloadQueryParams}/>
  )
}