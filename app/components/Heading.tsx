import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Heading() {
  return (
    <div className="hidden md:mt-2 md:flex md:gap-1 md:mb-4">
      <Badge className="bg-green-700 text-green-50 border-green-700 shadow-lg shadow-green-300 underline hover:text-green-100 hover:underline">Radiografi Umum/Mobile</Badge>

      <Link href="/dashboard/fluoroskopi/kolimasi">
        <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-green-600 hover:underline">
          Fluroskopi
        </Badge>
      </Link>

      <Link href="/dashboard/ct/hvl">
        <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-fuchsia-600 hover:underline">
          CT Scan
        </Badge>
      </Link>

      <Link href="/dashboard/dental/kolimasi">
        <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-rose-400 hover:underline">
          Dental
        </Badge>
      </Link>

      <Link href="/dashboard/mammografi/kolimasi">
        <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-black hover:underline">
          Mammografi
        </Badge>
      </Link>

      <Link href="/dashboard/fluoroskopi-dual-mode/iluminasi">
        <Badge variant="secondary" className="text-gray-400 bg-green-100 border-green-700 hover:text-green-600 hover:underline">
          Fluroskopi Dual Mode
        </Badge>
      </Link>
    </div>
  );
}
