"use client";

//import EditDataRadForm from "@/app/feature/components/FormEditDataRad";
import EditDataFloForm from "@/app/feature/components/FormEditDataFlo";

interface FloProps {
  payloadQueryParams: {
    No_Seri: string;
    email: string;
  };
}

export default function EditDataFloComponent({ payloadQueryParams }: FloProps) {
  return <EditDataFloForm payloadQueryParams={payloadQueryParams} />;
}
