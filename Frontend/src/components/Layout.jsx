import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Diamond } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const showNavBar = !location.pathname.includes("/auth");
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <AnimatePresence mode="sync">
          {!isScrolled && isHomePage ? (
            <motion.div
              key="topLayout"
              className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-8 pt-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                layoutId="navDiamond"
                className="text-[#d4af37] drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                <Diamond className="h-7 w-7" />
              </motion.div>

              <motion.div
                layoutId="brandLogo"
                className="absolute left-1/2 transform -translate-x-1/2 text-center top-3"
              >
                <h1 className="text-5xl md:text-6xl font-light text-white tracking-widest uppercase drop-shadow-2xl">
                  Élégance
                </h1>
                <motion.div
                  layoutId="brandLine"
                  className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <p className="text-xs text-white/80 tracking-widest mt-2 font-light uppercase">
                  Timeless Luxury
                </p>
              </motion.div>

              <motion.div
                layoutId="navLinks"
                className="flex items-center space-x-6 text-white/70"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/"
                  className="hover:text-[#d4af37] transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/collections"
                  className="hover:text-[#d4af37] transition-colors duration-300"
                >
                  Collections
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-[#d4af37] transition-colors duration-300"
                >
                  Profile
                </Link>
                <Link
                  to="/auth"
                  className="hover:text-[#d4af37] transition-colors duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            showNavBar && (
              <motion.div
                key="navBar"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <NavBar />
              </motion.div>
            )
          )}
        </AnimatePresence>

        <main>{children}</main>
      </div>
    </LayoutGroup>
  );
};

export default Layout;
