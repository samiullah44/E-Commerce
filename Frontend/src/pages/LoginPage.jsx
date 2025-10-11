import React from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuthForm } from "../hooks/useAuthForm";
import SocialAuthButtons from "../components/SocialAuthButtons";
import AuthDivider from "../components/AuthDivider";

const LoginPage = ({ onFlip, isVisible }) => {
  const {
    formData,
    formState,
    isLoading,
    handlers: {
      handleInputChange,
      handleInputBlur,
      togglePasswordVisibility,
      handleSubmit,
    },
    validation: { isValidEmail },
  } = useAuthForm("login");

  const getEmailError = () => {
    if ((formState.submitted || formState.touched.email) && !formData.email) {
      return "Email is required";
    }
    if (
      (formState.submitted || formState.touched.email) &&
      formData.email &&
      !isValidEmail(formData.email)
    ) {
      return "Enter a valid email address";
    }
    return null;
  };

  const getPasswordError = () => {
    if (
      (formState.submitted || formState.touched.password) &&
      !formData.password
    ) {
      return "Password is required";
    }
    return null;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-xl p-8 md:px-10 space-y-6 h-full flex flex-col justify-center">
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

        <SocialAuthButtons />

        <AuthDivider />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            placeholder="example@gmail.com"
            icon={Mail}
            error={getEmailError()}
            touched={formState.submitted || formState.touched.email}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur("email")}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="••••••••"
            icon={Lock}
            error={getPasswordError()}
            touched={formState.submitted || formState.touched.password}
            showPasswordToggle={true}
            isPasswordVisible={formState.showPassword}
            onPasswordToggle={togglePasswordVisibility}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur("password")}
          />

          <div className="text-right -mt-2">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-[#b6935c] hover:underline transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 py-2.5 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
                formData.email &&
                isValidEmail(formData.email) &&
                formData.password
                  ? "bg-gradient-to-br from-[#d4b241] to-[#c4ac56] hover:scale-105 hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
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
          Don't have an account?{" "}
          <button
            onClick={onFlip}
            className="text-[#d4af37] font-medium hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 rounded px-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
