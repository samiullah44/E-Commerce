import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PasswordChecklist from "../components/PasswordChecklist";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignupPage = ({ setIsFlipped }) => {
  const { signup, isSigningUp } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: "",
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
      !formData.name ||
      !formData.email ||
      !isValidEmail(formData.email) ||
      !isPasswordValid
    ) {
      toast.error("All fields are required");
      return;
    }

    signup(formData);
  };

  return (
    <div className="[transform:rotateY(180deg)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-md "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/60 border border-[#d4af37]/30 rounded-3xl shadow-xl p-8 md:px-10 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
              <span className="bg-gradient-to-r from-gray-800 via-[#d4af37] to-gray-700 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Join the future of elegant online shopping
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
              OTP
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
                Full Name
              </label>
              <div className="relative">
                <User className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  className="w-full rounded-2xl border border-gray-300 pl-10 pr-3 py-2  bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-200"
                />
              </div>
              {(submitted || touched.name) && !formData.name && (
                <p className="text-red-500 text-xs mt-1">
                  Full name is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className="w-full rounded-2xl border border-gray-300 pl-10 pr-3 py-2  bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-200 hover:scale-[1.01]"
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
                <Lock className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={setValue}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  className="w-full rounded-2xl border border-gray-300 pl-10 pr-10 py-2 bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-200"
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

              {formData.password && (
                <PasswordChecklist
                  password={formData.password}
                  onValidChange={setIsPasswordValid}
                />
              )}

              {(submitted || touched.password) && !formData.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
              {(submitted || touched.password) &&
                formData.password &&
                !isPasswordValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Password does not meet the requirements
                  </p>
                )}
            </div>

            <div className="w-full text-center">
              <button
                type="submit"
                className={`w-1/2 py-2 rounded-2xl text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ${
                  isPasswordValid &&
                  formData.name &&
                  isValidEmail(formData.email)
                    ? "bg-gradient-to-br from-[#d4b241] to-[#c4ac56]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    Signing Up
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={setIsFlipped}
              className="text-[#d4af37] font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
