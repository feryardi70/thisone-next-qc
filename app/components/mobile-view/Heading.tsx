import { Badge } from "@/components/ui/badge";

export default function HeadingMobileView() {
    return (
      <div className="mt-2 flex flex-wrap gap-1 mb-4 md:hidden">
        <div className="w-2/5">
          <Badge className="w-[100%] text-center bg-green-700 text-green-50 border-green-700 shadow-lg shadow-green-300 underline hover:text-green-100 hover:underline">
            Radiografi Umum/Mobile
          </Badge>
        </div>

        <div className="w-2/5">
          <Badge
            variant="secondary"
            className="w-[85%] text-center text-gray-400 border-green-700 hover:text-lime-200 hover:underline"
          >
            Fluroskopi
          </Badge>
        </div>

        <div className="w-2/5">
          <Badge
            variant="secondary"
            className="w-[100%] text-center text-gray-400 border-green-700 hover:text-green-900 hover:underline"
          >
            CT Scan
          </Badge>
        </div>

        <div className="w-2/5">
          <Badge
            variant="secondary"
            className="w-[80%] text-center border-green-700 text-gray-400 hover:text-rose-400 hover:underline"
          >
            Dental
          </Badge>
        </div>

        <div className="w-2/5">
          <Badge
            variant="secondary"
            className="w-[100%] text-center text-gray-400 border-green-700 hover:text-fuchsia-300 hover:underline"
          >
            Mammografi
          </Badge>
        </div>

        <div className="w-w-2/5">
          <Badge
            variant="secondary"
            className="w-[100%] text-center text-gray-400 border-green-700 hover:text-lime-200 hover:underline"
          >
            Fluroskopi Dual Mode
          </Badge>
        </div>
      </div>
    );
}