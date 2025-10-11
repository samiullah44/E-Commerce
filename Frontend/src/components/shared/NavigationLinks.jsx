import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const NavigationLinks = ({
  links,
  orientation = "horizontal",
  onLinkClick,
  showActiveHighlight = true,
}) => {
  const location = useLocation();

  const containerClass =
    orientation === "horizontal" ? "flex items-center space-x-1" : "space-y-2";

  const linkClass =
    orientation === "horizontal"
      ? "flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-light"
      : "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-light";

  return (
    <div className={containerClass}>
      {links.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={onLinkClick}
            className={`relative transition-all duration-500 group ${
              isActive
                ? "text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            } ${linkClass}`}
          >
            {/* Active Highlight */}
            {showActiveHighlight && isActive && (
              <motion.div
                layoutId="activeHighlight"
                className="absolute inset-0 bg-white/10 border border-[#d4af37]/40 rounded-full shadow-[0_0_15px_#d4af37]"
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            )}

            <Icon className="h-4 w-4 relative z-10" />
            <span className="relative z-10">{item.name}</span>

            {/* Sparkle Effect on Hover */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationLinks;
