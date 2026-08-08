import { Badge } from "@/components/ui/badge";
//import Link from "next/link";

export default function Heading() {
  return (
    <div className="hidden md:mt-2 md:flex md:gap-1 md:mb-4">
      <Badge className="bg-green-100 text-gray-400 border-green-700 hover:text-gray-800 hover:underline">Radiografi Umum/Mobile</Badge>

      <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:underline hover:text-green-600">
        Fluroskopi
      </Badge>

      <Badge variant="secondary" className="text-green-400 bg-gray-950 border-green-700 shadow-lg shadow-gray-400 hover:text-emerald-600 hover:underline">
        CT Scan
      </Badge>

      <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-rose-400 hover:underline">
        Dental
      </Badge>

      <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-fuchsia-600 hover:underline">
        Mammografi
      </Badge>

      <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-green-600 hover:underline">
        Fluroskopi Dual Mode
      </Badge>
    </div>
  );
}
