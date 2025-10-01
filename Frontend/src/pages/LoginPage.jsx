import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLogingIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const setValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.email ||
      !isValidEmail(formData.email) ||
      !formData.password
    ) {
      toast.error("All Fields required");
      return;
    }

    login(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100 p-4 animate-fadeIn">
      <div className="w-full max-w-lg">
        <div className="backdrop-blur-xl border bg-black border-white/50 rounded-2xl shadow-2xl py-6 px-6 md:px-10 space-y-6 animate-fadeInUp">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-400 bg-clip-text text-transparent">
              Login
            </h1>
            <p className="text-base-content/70 mt-2 text-sm md:text-base">
              Welcome back! Please log in to continue
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="flex-1 text-lg py-2 rounded-2xl bg-gradient-to-tr from-purple-600 to-accent text-white shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Google
            </button>
            <button
              type="button"
              className="flex-1 text-lg py-2 rounded-2xl bg-gradient-to-bl from-cyan-400 to-amber-600 text-white shadow-lg hover:scale-105 transition-transform duration-200"
            >
              OTP
            </button>
          </div>

          <div className="divider text-sm text-base-content/70">or</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block text-sm md:text-base font-medium p-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className="peer w-full rounded-2xl border pl-10 py-2 pr-3 text-sm md:text-base shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-transform duration-200 hover:scale-[1.01]"
                />
                <Mail className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
              </div>
              {(submitted || touched.email) && !formData.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
              {(submitted || touched.email) &&
                formData.email &&
                !isValidEmail(formData.email) && (
                  <p className="text-red-500 text-xs mt-1">
                    Enter a valid email address
                  </p>
                )}
            </div>

            <div className="relative">
              <label className="block text-sm md:text-base font-medium p-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  className="peer w-full rounded-2xl border pl-10 pr-10 py-2 text-sm md:text-base shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-transform duration-200 hover:scale-[1.01]"
                />
                <Lock className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-blue-500 transition"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {(submitted || touched.password) && !formData.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}

              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs md:text-sm font-medium text-primary hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="w-full text-center">
              <button
                type="submit"
                className={`w-1/2 py-2 rounded-2xl text-white font-medium shadow-lg hover:scale-105 transition-transform duration-200 ${
                  formData.email &&
                  isValidEmail(formData.email) &&
                  formData.password
                    ? "bg-gradient-to-bl from-indigo-600 to-purple-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isLogingIn}
              >
                {isLogingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    Logging In
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-base-content/70">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
