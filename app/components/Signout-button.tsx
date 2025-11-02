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
  const hidden = false;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <AlertDialogAction
              className="bg-fuchsia-600"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Signing out..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <button
        className="px-6 py-3 bg-green-500 rounded-lg flex flex-row gap-1"
        onClick={() => openModal()}
        disabled={loading}
      >
        <LogOut className="h-4 w-4" />
        {loading ? "Signing out..." : "Sign Out"}
      </button>
      {isModalOpen && (
        <div className="fixed right-5 top-5 bg-white/10 backdrop-blur-md z-50">
          <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this data?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSignOut}
                className="bg-fuchsia-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}
      {loading && (
        <div className="flex justify-center items-center z-99">
          <div>loading...</div>
        </div>
      )}
    </div>
  );
}
