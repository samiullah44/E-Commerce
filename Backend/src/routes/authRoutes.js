import express from "express";
import { body } from "express-validator";
import {signupUser,loginUser,logoutUser,refresh,forgotPassword, resetPassword, googleSignIn} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";


const router = express.Router();

const passwordValidation = [
  body("password")
  .notEmpty()
  .withMessage("Password is Required")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/\d/)
  .withMessage("Password must contain at least one number"),
];
const emailValidation=[
  body("email")
  .notEmpty()
  .withMessage("Email field is empty")
  .isEmail()
  .withMessage("Please enter a valid email address")
  .normalizeEmail()
];

export const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many login attempts, try again later" }
});

router.post(
  "/signup",reqLimiter,
  [
    body("name")
      .notEmpty()
      .withMessage("Name field required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name will be between 3 to 30 characters"),
    ...emailValidation,
    ...passwordValidation,
  ],
  signupUser
);

router.post(
  "/login",reqLimiter,
  [
    ...emailValidation,
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  loginUser
);

// refresh: reads refresh token from httpOnly cookie and returns new access token
router.post("/refresh", refresh);

router.post("/logout", logoutUser);

router.post("/forgot-password", ...emailValidation, forgotPassword);

router.post("/reset-password", [
  body("token").notEmpty().withMessage("Token required"),
  ...passwordValidation,
  ...emailValidation
], resetPassword);

router.post("/google", [
  body("idToken").notEmpty().withMessage("ID token required")
], googleSignIn);


export default router;
