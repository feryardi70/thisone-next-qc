"use client";

//import { signOutAction } from "@/app/action/signout";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
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
import { useState } from "react";
//import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function SignOut() {
  const [loading, setLoading] = useState(false);
  const hidden = false

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/login" });
    } finally {
      // no need to reset loading since signOut will redirect away,
      // but for safety:
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-green-600 text-white px-4 py-2 rounded hover:bg-fuchsia-400 flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          {loading ? "Signing out..." : "Sign Out"}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
            {hidden ? 'You will be logged out of your account and redirected to the login page.' : null}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <form> */}
            <AlertDialogAction
              className="bg-fuchsia-600"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Signing out..." : "Continue"}
            </AlertDialogAction>
            {/* </form> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {loading && (
        <div className="flex justify-center items-center z-99">
          <div>loading...</div>
        </div>
      )}
    </div>
  );
}
