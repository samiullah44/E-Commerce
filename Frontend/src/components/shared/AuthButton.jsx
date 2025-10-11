import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const AuthButton = ({ buttonConfig, className = "" }) => {
  const Icon = buttonConfig.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Link to={buttonConfig.href}>
        <div className="group relative bg-gradient-to-r from-[#d4af37] to-[#bca03a] text-white px-6 py-2 rounded-full font-medium hover:shadow-[0_0_20px_#d4af37]/50 transition-all duration-500 overflow-hidden">
          {/* Shine Effect */}
          <motion.div
            animate={{ x: [-100, 300] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          <span className="flex items-center space-x-2 relative z-10">
            <Icon className="h-4 w-4" />
            <span>{buttonConfig.text}</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default AuthButton;
