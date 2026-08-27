"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { ChevronsRight, ChevronsUpDown } from "lucide-react";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type Modality = {
  label: string;
  value: string;
  href: string;
};

// Daftar modality dashboard: radiografi, dental, ct, mammografi, dst.
const MODALITIES: Modality[] = [
  { label: "Radiografi Umum/Mobile", value: "radiografi", href: "/dashboard" },
  { label: "Fluoroskopi", value: "fluoroskopi", href: "/dashboard/fluoroskopi/kolimasi" },
  { label: "Dental", value: "dental", href: "/dashboard/dental/kolimasi" },
  { label: "CT Scan", value: "ct", href: "/dashboard/ct/hvl" },
  { label: "Mammografi", value: "mammografi", href: "/dashboard/mammografi/kolimasi" },
  { label: "Fluoroskopi Dual Mode", value: "fluoroskopi-dual", href: "/dashboard/fluoroskopi-dual-mode/iluminasi" },
];

export default function HeadingMobileView() {
  const [selectedModality, setSelectedModality] = useState<string>("");
  const router = useRouter();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedModality(value);

    const modality = MODALITIES.find((item) => item.value === value);
    if (modality) {
      // Navigasi client-side ke dashboard modality yang dipilih.
      router.push(modality.href);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 mb-4 md:hidden">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex-wrap items-center gap-3">
          {/* 📌 Dashboard: link langsung (tanpa dropdown), icon ChevronsRight */}
          <NavigationMenuItem>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Dashboard
              <ChevronsRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </NavigationMenuItem>

          {/* 📌 Pilih Modality: native select, icon ChevronsUpDown */}
          <NavigationMenuItem>
            <div
              className="relative [&_[data-slot=native-select-icon]]:hidden"
              // Sembunyikan icon bawaan (ChevronDown) dari NativeSelect,
              // lalu ganti dengan ChevronsUpDown di posisi yang sama.
            >
              <NativeSelect size="sm" aria-label="Pilih dashboard modality" className="w-36 sm:w-44 bg-white !text-black" value={selectedModality} onChange={handleSelectChange}>
                <NativeSelectOption value="" disabled>
                  Pilih modality...
                </NativeSelectOption>
                {MODALITIES.map((modality) => (
                  <NativeSelectOption key={modality.value} value={modality.value}>
                    {modality.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <ChevronsUpDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-black opacity-70" />
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
