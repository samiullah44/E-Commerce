import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AuthFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8f6f2] px-4 p-2">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {isFlipped ? (
          <SignupPage setIsFlipped={flipCard} />
        ) : (
          <LoginPage setIsFlipped={flipCard} />
        )}
      </motion.div>
    </div>
  );
};

export default AuthFlipCard;
