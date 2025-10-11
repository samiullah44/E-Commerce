import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = ({ setIsFlipped }) => {
  const { login, isLogingIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const [formData, setFormData] = useState({ email: "", password: "" });

  const setValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.email ||
      !isValidEmail(formData.email) ||
      !formData.password
    ) {
      toast.error("All fields are required");
      return;
    }

    login(formData);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-xl p-8 md:px-10 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
              <span className="bg-gradient-to-r from-gray-800 via-[#d4af37] to-gray-700 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Sign in to continue your journey
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-[#d4b241] to-[#c4ac56] text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl border border-gray-300 bg-white/70 text-gray-800 font-medium shadow-sm hover:bg-gray-50 hover:scale-[1.02] transition duration-300"
            >
              Login with OTP
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400 border-1"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-400 border-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition duration-200"
                />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#b6935c] transition"
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
                  className="text-xs font-medium text-[#b6935c] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLogingIn}
                className={`w-1/2 py-2.5 rounded-xl font-semibold hover:scale-105 text-white shadow-md transition-transform duration-300 ${
                  formData.email &&
                  isValidEmail(formData.email) &&
                  formData.password
                    ? "bg-gradient-to-br from-[#d4b241] to-[#c4ac56] hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isLogingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin size-5" />
                    Logging In
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={setIsFlipped}
              className="text-[#d4af37] font-medium hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default LoginPage;
