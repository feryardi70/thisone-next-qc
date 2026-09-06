import { baseUrl } from "../lib/constant";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldCheck, KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function VerifyUserPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { token } = await searchParams;
  console.log("Token:", token);

  const verificationResponse = await fetch(`${baseUrl}/user/${token}`);

  if (verificationResponse.status !== 200) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-lime-900 to-green-950">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('1785032946842.jpg')",
          }}
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl mb-4 shadow-lg">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <KeySquare className="h-9 text-yellow-300" />
                  <h1 className="text-3xl font-bold text-white mb-0">
                    Verification <span className="text-yellow-300">Failed</span>
                  </h1>
                  <KeySquare className="h-9 text-yellow-300" />
                </div>
                <p className="text-white/70">
                  <small>We couldn&apos;t verify your account</small>
                </p>
              </div>

              {/* Message */}
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-sm">Sorry, verification link may be invalid or expired, but you can still login and request a new verification link.</p>
              </div>

              {/* Action */}
              {/* <Button
                asChild
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Link href="/register">Go back to Register</Link>
              </Button> */}

              <div className="mt-6 text-center">
                <p className="text-white/70">
                  <Link href="/login" className="text-yellow-300 hover:text-white font-medium transition-colors">
                    Login
                  </Link>
                  {" Now?"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-lime-900 to-green-950">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('1785032946842.jpg')",
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <KeySquare className="h-9 text-yellow-300" />
                <h1 className="text-3xl font-bold text-white mb-0">
                  Verification <span className="text-yellow-300">Succeeded</span>
                </h1>
                <KeySquare className="h-9 text-yellow-300" />
              </div>
              <p className="text-white/70">
                <small>Your account is now active</small>
              </p>
            </div>

            {/* Success Indicator */}
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>

            {/* Message */}
            <p className="text-white/80 mb-6">Your account has been successfully verified. You can now sign in to access your dashboard.</p>

            {/* Action */}
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Link href="/login">Continue to Login</Link>
            </Button>

            {/* <div className="mt-6 text-center">
              <p className="text-white/70">
                {"Need help? "}
                <Link href="/register" className="text-yellow-300 hover:text-white font-medium transition-colors">
                  Register a new account
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
