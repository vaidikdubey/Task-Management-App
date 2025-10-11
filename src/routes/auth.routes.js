import { Router } from "express";
import { userRegistrationValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidate } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgottenPassword, verifyEmail } from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router
  .route("/verify/:token")
  .get(verifyEmail);

router
  .route("/login")
  .post(userLoginValidator(), validate, loginUser);

router
  .route("/logout")
  .get(isLoggedIn, logoutUser);

router
  .route("/resend-verification")
  .get(isLoggedIn, resendEmailVerification);

router
  .route("/refresh-access-token")
  .get(refreshAccessToken);

router
  .route("/profile")
  .get(isLoggedIn, getCurrentUser);

router
  .route("/forgot-password")
  .post(forgotPasswordValidator(), validate, forgotPasswordRequest);
  
router
  .route("/reset-password/:token")
  .post(resetPasswordValidate(), validate, resetForgottenPassword);

router
  .route("/change-password")
  .post(isLoggedIn, resetPasswordValidate(), validate, changeCurrentPassword);

export default router;
