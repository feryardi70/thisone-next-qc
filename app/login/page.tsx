"use client";

import { useState, useEffect } from "react";
import { signInCredentials } from "../action/signin";
import getSession from "../action/session";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  KeySquare,
  Mail,
} from "lucide-react";
import { SignInGoogle } from "../components/signin-google";

export default function SignIn() {
  const router = useRouter();
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSession();

      setSession(result ? true : false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session === true) {
      router.push("/");
    }
  }, [session, router]);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signInCredentials(formState);
      //console.log("Response from signInCredentials:", result);

      if (result === "Invalid email or password.") {
        setError(
          "Authentication failed, wrong username and password combination"
        );
      } else if (typeof result == "string") {
        setError("An error occurred during login");
      } else {
        setError("");
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/img/nias2.jpeg')",
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
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <KeySquare className="h-9 text-yellow-300" />
                <h1 className="text-3xl font-bold text-white mb-0">
                  Form <span className="text-yellow-300">Login</span>
                </h1>
                <KeySquare className="h-9 text-yellow-300" />
              </div>
              <p className="text-white/70">
                <small>Sign in to continue</small>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={formAction} className="space-y-3">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-300 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-12 h-12 bg-white/10 border-white/20 text-black placeholder:text-white/50 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-yellow-300 font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-black placeholder:text-white/50 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                {/* <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <span className="text-white/70 text-sm">Remember me</span>
                </label> */}
                <Link
                  href="/forgot"
                  className="text-purple-300 hover:text-yellow-300 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            {/* <div className="relative mt-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white/50 whitespace-nowrap text-nowrap">
                    Or continue with
                  </span>
                </div>
              </div> */}
            <div className="w-full flex items-center justify-center gap-1.5 mt-2">
              <div className="w-[100px] h-[3px] rounded-md bg-gray-400" />
              <span className="text-gray-700 font-mono font-semibold">OR</span>
              <div className="w-[100px] h-[3px] rounded-md bg-gray-400" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center items-center mt-2">
              <SignInGoogle />
            </div>

            {/* Sign Up Link */}
            <div className="mt-3 text-center">
              <p className="text-white/70">
                {"Don't have an account? "}
                <Link
                  href="/register"
                  className="text-yellow-300 hover:text-white font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
