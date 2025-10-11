import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Gem,
  Crown,
  Sparkles,
  User,
  Home,
  GalleryVertical,
  Phone,
} from "lucide-react";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Collections", href: "/collections", icon: GalleryVertical },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };
  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
    },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20 relative">
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 flex items-center space-x-3"
          >
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="relative"
            >
              <div className="relative">
                <Gem className="h-8 w-8 text-[#d4af37]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-[#d4af37]/30 rounded-full"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-[#d4af37]/20 blur-sm rounded-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0.5, y: 20, scale: 1.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <span className="text-2xl font-serif text-white font-medium tracking-wider leading-none hover:text-[#d4af37]">
                Élégance
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-[#d4af37] to-transparent mt-1"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Navigation + Auth */}
          <div className="flex items-center space-x-3">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    onHoverStart={() => setActiveHover(item.name)}
                    onHoverEnd={() => setActiveHover(null)}
                    className="relative"
                  >
                    <Link
                      to={item.href}
                      className={`relative flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-light transition-all duration-500 ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white hover:bg-[#d4af37]/80"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeHighlight"
                          className="absolute inset-0 bg-white/10 border border-[#d4af37]/40 rounded-full shadow-[0_0_15px_#d4af37]"
                          transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                          }}
                        />
                      )}
                      <item.icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.name}</span>

                      <AnimatePresence>
                        {activeHover === item.name && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-1 -right-1"
                          >
                            <Sparkles className="h-3 w-3 text-yellow-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Auth Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/auth">
                <div className="group relative bg-gradient-to-r from-[#d4af37] to-[#bca03a] text-white px-6 py-2 rounded-full font-medium hover:shadow-[0_0_20px_#d4af37]/50 transition-all duration-500 overflow-hidden">
                  <motion.div
                    animate={{ x: [-100, 300] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <span className="flex items-center space-x-2 relative z-10">
                    <Crown className="h-4 w-4" />
                    <span>Enter Luxury</span>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/70 hover:text-white transition p-2 rounded-xl bg-white/5 hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mt-2"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
                        isActive
                          ? "bg-white/10 text-white border border-[#d4af37]/40"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;
