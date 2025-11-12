import { Badge } from "@/components/ui/badge";

export default function Heading() {
    return (
      <div className="hidden md:mt-2 md:flex md:gap-1 md:mb-4">
        <Badge className="bg-green-700 text-green-50 border-green-700 shadow-lg shadow-green-300 underline hover:text-green-100 hover:underline">
          Radiografi Umum/Mobile
        </Badge>

        <Badge
          variant="secondary"
          className="text-gray-400 border-green-700 hover:text-green-600 hover:underline"
        >
          Fluroskopi
        </Badge>

        <Badge
          variant="secondary"
          className="text-gray-400 border-green-700 hover:text-fuchsia-600 hover:underline"
        >
          CT Scan
        </Badge>

        <Badge
          variant="secondary"
          className="border-green-700 text-gray-400 hover:text-rose-400 hover:underline"
        >
          Dental
        </Badge>

        <Badge
          variant="secondary"
          className="text-gray-400 border-green-700 hover:text-black hover:underline"
        >
          Mammografi
        </Badge>

        <Badge
          variant="secondary"
          className="text-gray-400 border-green-700 hover:text-green-600 hover:underline"
        >
          Fluroskopi Dual Mode
        </Badge>
      </div>
    );
}