'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Radiation, UserRound, CircleUserRound, UserCog, Crown } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";

export default function Header({ email }: { email: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
      try {
        setLoading(true);
        await signOut({
          redirect: true,
          redirectTo: "/login",
        });
      } finally {
        // no need to reset loading since signOut will redirect away,
        // but for safety:
        setLoading(false);
      }
    };

  return (
    <header className="h-16 flex items-center justify-end px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 border-2 p-1 rounded-full hover:bg-green-300">
            <UserRound size={25} color="green" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[410px] min-h-64 flex flex-col justify-center items-center"
        >
          <DropdownMenuLabel className="font-semibold">
            {email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="min-h-10">
            <div className="profileimage w-24 h-24">
              <CircleUserRound className="w-24 h-30" size={200} />
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="flex flex-row justify-center items-center">
            <DropdownMenuItem className="mt-5">
              <div className="px-6 py-3 hover:px-7 hover:py-4 bg-green-500 rounded-lg flex flex-row gap-1">
                <UserCog />
                <div>Setting</div>
              </div>
              <div className="px-3 py-3 hover:px-4 hover:py-4 hover:z-10 bg-green-500 hover:shadow-black hover:shadow-lg rounded-lg flex flex-row gap-1">
                <Crown color="yellow" />
                <div>Upgrade to Pro</div>
              </div>

              {/* <SignOut /> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="mt-5" onSelect={(e) => e.preventDefault()}>
              <button
                onClick={() => setOpenDialog(true)}
                className="px-3 py-3 hover:px-4 hover:py-4 bg-green-500 hover:shadow-black hover:shadow-lg rounded-lg flex flex-row gap-1 ml-[-8px]"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog di luar */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-emerald-700 hover:text-emerald-600">Cancel</AlertDialogCancel>
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
  );};
