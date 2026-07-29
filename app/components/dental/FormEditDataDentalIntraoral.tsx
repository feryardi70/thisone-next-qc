"use client";

//import EditDataRadForm from "@/app/feature/components/FormEditDataRad";
import EditDataDentalIntraoralForm from "@/app/feature/components/FormEditDataDentalIntraoral";

interface DentalProps {
  payloadQueryParams: {
    No_Seri: string;
    email: string;
  };
}

export default function EditDataDentalIntraoralComponent({ payloadQueryParams }: DentalProps) {
  return <EditDataDentalIntraoralForm payloadQueryParams={payloadQueryParams} />;
}
