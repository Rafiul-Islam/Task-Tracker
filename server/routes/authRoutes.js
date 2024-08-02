import express from "express";
import {
  generateForgotPasswordURL,
  login,
  resetPassword,
  signup,
  validateResetPasswordURL,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/forgot-password").post(generateForgotPasswordURL);

router.route("/reset-password/:userId/:token").get(validateResetPasswordURL);

router.route("/reset-password/:userId").patch(resetPassword);

export default router;
