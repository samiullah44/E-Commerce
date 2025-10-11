import React from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";

const BrandLogo = ({
  size = "default",
  showTagline = true,
  className = "",
}) => {
  const sizes = {
    small: {
      icon: "h-6 w-6",
      text: "text-xl",
      line: "w-12",
    },
    default: {
      icon: "h-8 w-8",
      text: "text-2xl",
      line: "w-16",
    },
    large: {
      icon: "h-12 w-12",
      text: "text-4xl",
      line: "w-24",
    },
  };

  const { icon, text, line } = sizes[size];

  return (
    <motion.div className={`flex items-center space-x-3 ${className}`}>
      {/* Animated Diamond Icon */}
      <motion.div className="relative">
        <Gem className={`${icon} text-[#d4af37]`} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-[#d4af37]/30 rounded-full"
        />
      </motion.div>

      {/* Brand Text */}
      <motion.div className="flex flex-col">
        <span
          className={`${text} font-serif text-white font-medium tracking-wider leading-none`}
        >
          Élégance
        </span>
        {showTagline && (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: line }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-[#d4af37] to-transparent mt-1"
            />
            <p className="text-xs text-white/70 tracking-widest mt-1 font-light uppercase">
              Timeless Luxury
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BrandLogo;
