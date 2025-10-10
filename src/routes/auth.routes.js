import { Router } from "express";
import { userRegistrationValidator } from "../validators.js";
import { validate } from "../middlewares/validator.middleware.js";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export default router;
