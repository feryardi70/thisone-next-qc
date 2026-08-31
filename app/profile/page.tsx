"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  CalendarDays,
  MapPin,
  Moon,
  PencilLine,
  Save,
  ShieldCheck,
  Star,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const statCards = [
  { label: "Total QC entries", value: "1,248", change: "+12.4%" },
  { label: "Reports generated", value: "86", change: "+8.1%" },
  { label: "Approval rate", value: "97.2%", change: "+2.3%" },
  { label: "On-time review", value: "94.8%", change: "+1.9%" },
];

const recentActivity = [
  "Reviewed CT Scan performance weekly summary",
  "Submitted dental QC monthly report",
  "Updated fluoroscopy calibration checklist",
  "Completed compliance training module",
];

const initialProfile = {
  fullName: "Anisa Dwi",
  role: "Quality Control Supervisor",
  email: "anisa.dwi@thisoneqc.com",
  phone: "+62 812 3456 7890",
  location: "Jakarta, Indonesia",
  department: "Clinical Engineering",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (field: keyof typeof initialProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <button className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-300">
              <Bell className="h-4 w-4" />
              Notifications
            </button>

            <Drawer open={open} onOpenChange={setOpen} direction="right">
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                >
                  <PencilLine className="h-4 w-4" />
                  Edit profile
                </Button>
              </DrawerTrigger>

              <DrawerContent className="!fixed !inset-y-0 !right-0 !left-auto !top-0 !bottom-auto !m-0 !h-full !w-[430px] !max-w-[94vw] !rounded-none border-l border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                <DrawerHeader className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                  <div>
                    <DrawerTitle className="text-xl font-semibold text-slate-900 dark:text-white">Edit profile</DrawerTitle>
                    <DrawerDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Update your account details.
                    </DrawerDescription>
                  </div>

                  <DrawerClose asChild>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      aria-label="Close edit form"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-300 text-lg font-bold text-slate-950">
                      {profile.fullName
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Profile picture</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Full name</label>
                      <Input
                        value={profile.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Role</label>
                      <Input
                        value={profile.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Phone</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Location</label>
                      <Input
                        value={profile.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Department</label>
                      <Input
                        value={profile.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <DrawerFooter className="border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex w-full items-center justify-between gap-3">
                    <DrawerClose asChild>
                      <Button type="button" variant="outline" className="border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                        Cancel
                      </Button>
                    </DrawerClose>

                    <Button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    >
                      <Save className="h-4 w-4" />
                      Save changes
                    </Button>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 shadow-2xl dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40">
          <div className="border-b border-slate-200 bg-slate-100/80 px-6 py-6 sm:px-8 dark:border-slate-800 dark:bg-white/5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-300 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/30">
                  {profile.fullName
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold sm:text-3xl">{profile.fullName}</h1>
                    <BadgeCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{profile.role}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      {profile.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-emerald-400" />
                      Joined 2022
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3">
                <Star className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Plan</p>
                  <p className="text-xs text-slate-400">Free Tier</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</span>
                      <span className="text-xs font-semibold text-emerald-300">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent activity</h2>
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={activity} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 dark:text-slate-200">{activity}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{index + 1} day{index === 0 ? "" : "s"} ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Professional summary</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Experienced in radiology quality assurance, equipment validation, and analytical reporting. Focused on maintaining compliance standards and improving inspection workflow across multiple modalities.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Invoice history</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "INV-2024-018", date: "12 Aug 2024", amount: "Rp 0", status: "Free plan" },
                  ].map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{invoice.id}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{invoice.amount}</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-300">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li>Email: {profile.email}</li>
                  <li>Phone: {profile.phone}</li>
                  <li>Department: {profile.department}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
