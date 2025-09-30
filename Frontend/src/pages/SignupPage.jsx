import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-300 via-white to-purple-300 dark:from-gray-900 dark:via-black dark:to-gray-800 p-4 animate-fadeIn">
      <div className="w-full max-w-lg">
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl py-6 px-6 md:px-10 space-y-6 animate-fadeInUp">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-base-content/70 mt-2 text-sm md:text-base">
              Join the future of Online Shopping
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn flex-1 text-lg py-2 rounded-2xl bg-gradient-to-tr from-purple-600 to-accent text-white shadow-lg hover:scale-105 transition-transform duration-200">
              Google
            </button>
            <button className="btn flex-1 text-lg py-2 rounded-2xl bg-gradient-to-bl from-cyan-400 to-amber-600 text-white shadow-lg hover:scale-105 transition-transform duration-200">
              OTP
            </button>
          </div>

          <div className="divider text-sm text-base-content/70">or</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label htmlFor="name" className="relative block">
              <span className="label-text text-sm md:text-base font-medium p-2">
                Full Name
              </span>
              <input
                type="text"
                placeholder="Enter Name"
                className="peer w-full rounded-2xl border border-b-cyan-600 border-r-cyan-600 border-l-cyan-600 pl-10 py-2 pr-3 text-sm md:text-base shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-transform duration-200 hover:scale-[1.01]"
              />
              <User className="size-5 absolute left-3 top-[70%] -translate-y-1/2 text-base-content/50 pointer-events-none transition-transform duration-200 peer-focus:scale-110 peer-focus:-translate-y-3" />
            </label>

            <label htmlFor="email" className="relative block">
              <span className="label-text text-sm md:text-base font-medium p-2">
                Email
              </span>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="peer w-full rounded-2xl border border-b-cyan-600 border-r-cyan-600 border-l-cyan-600 pl-10 py-2 pr-3 text-sm md:text-base shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-transform duration-200 hover:scale-[1.01]"
              />
              <Mail className="size-5 absolute left-3 top-[70%] -translate-y-1/2 text-base-content/50 pointer-events-none transition-transform duration-200 peer-focus:scale-110 peer-focus:-translate-y-3" />
            </label>

            <label htmlFor="password" className="relative block">
              <span className="label-text text-sm md:text-base font-medium p-2">
                Password
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="peer w-full rounded-2xl border border-b-cyan-600 border-r-cyan-600 border-l-cyan-600 pl-10 py-2 pr-10 text-sm md:text-base shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-transform duration-200 hover:scale-[1.01]"
              />
              <Lock className="size-5 absolute left-3 top-[50%] -translate-y-1/2 text-base-content/50 pointer-events-none transition-transform duration-200 peer-focus:scale-110 peer-focus:-translate-y-3" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[50%] -translate-y-1/2 text-base-content/60 hover:text-blue-500 transition"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
              <div className="text-right mt-1">
                <a
                  href="/forgot-password"
                  className="text-xs md:text-sm font-medium text-primary hover:underline transition"
                >
                  Forgot Password?
                </a>
              </div>
            </label>

            <div className="w-full text-center">
              <button
                type="submit"
                className="w-1/2 py-2 rounded-2xl text-white font-medium bg-gradient-to-bl from-accent to-purple-800 shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="text-center text-base-content/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
