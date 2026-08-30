"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  UserRound,
  CircleUserRound,
  UserCog,
  Crown,
  Sun,
  Moon,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header({ email }: { email: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({
        redirect: true,
        redirectTo: "/login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-green-200 dark:bg-gray-900 border-b border-green-200 dark:border-gray-800">
      <div />
      <div className="flex items-center gap-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 border-2 border-green-950 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-green-100">
              <UserRound size={25} color="green" className="dark:text-white" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[410px] min-h-64 flex flex-col justify-center items-center bg-white dark:bg-gray-900"
          >
            <DropdownMenuLabel className="font-semibold text-gray-900 dark:text-white">
              {email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
            <div className="min-h-10">
              <div className="profileimage w-24 h-24">
                <CircleUserRound
                  className="w-24 h-30 text-gray-900 dark:text-white"
                  size={200}
                />
              </div>
            </div>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
            <div className="flex flex-row justify-center items-center">
              <DropdownMenuItem className="mt-5">
                <div className="px-6 py-3 hover:px-7 hover:py-4 bg-green-500 rounded-lg flex flex-row gap-1 text-white">
                  <Link className="flex flex-row" href="/profile">
                    <UserCog color="white" />
                    <div>Setting</div>
                  </Link>
                </div>
                <div className="px-3 py-3 hover:px-4 hover:py-4 hover:z-10 bg-green-500 hover:shadow-black hover:shadow-lg rounded-lg flex flex-row gap-1 text-white">
                    <Crown color="yellow" />
                    <div>Upgrade to Pro</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="mt-5"
                onSelect={(e) => e.preventDefault()}
              >
                <button
                  onClick={() => setOpenDialog(true)}
                  className="px-3 py-3 hover:px-4 hover:py-4 bg-green-500 hover:shadow-black hover:shadow-lg rounded-lg flex flex-row gap-1 ml-[-8px] text-white"
                >
                  <LogOut color="white" className="h-4 w-4" />
                  Sign Out
                </button>
              </DropdownMenuItem>
            </div>
            {loading ? (
              <div className="italic text-2xl text-gray-500 dark:text-gray-400">
                Signing Out... Please wait
              </div>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              You will be logged out and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-emerald-700 hover:text-emerald-600 dark:bg-gray-800 dark:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-fuchsia-400"
              onClick={handleSignOut}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
