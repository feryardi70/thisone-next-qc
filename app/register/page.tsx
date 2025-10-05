"use client";

import { useState, useEffect } from "react";
//import getSession from "../action/session";
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
import { baseUrl } from "../lib/constant";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/initial-token`, {
          method: "GET",
          credentials: "include",
        });

        (await response.json());
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formState.password !== formState.confirmedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const checkUser = await fetch(
        `${baseUrl}/user?email=${formState.email}`,
        {
          method: "GET",
        }
      );
      const checkUserResult = await checkUser.json();
      //console.log(checkUserResult.status);
      if (checkUserResult.status === 200) {
        setError("User already exists");
        setIsLoading(false);
        return;
      }

      const payload = {
        email: formState.email,
        password: formState.password,
      };

      const response = await fetch(`${baseUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.status === 201) {
        alert("User registered successfully!");
        setIsLoading(false);
        // Redirect or reset form here if needed
        router.push("/login");
      } else {
        console.log("Failed to register user, please refresh the page and try again.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Error:", error);
      setIsLoading(false);
    }
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
                  Form <span className="text-yellow-300">Register</span>
                </h1>
                <KeySquare className="h-9 text-yellow-300" />
              </div>
              {/* <p className="text-white/70"><small>Sign in to continue</small></p> */}
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

              {/* Confirmed Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmedPassword"
                  className="text-yellow-300 font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="confirmedPassword"
                    name="confirmedPassword"
                    type={showConfirmedPassword ? "text" : "password"}
                    value={formState.confirmedPassword}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-black placeholder:text-white/50 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmedPassword(!showConfirmedPassword)
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showConfirmedPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
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
                    Signing you up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-3 text-center">
              <p className="text-white/70">
                {"Already have an account? "}
                <Link
                  href={"/login"}
                  className="text-yellow-300 hover:text-white font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
