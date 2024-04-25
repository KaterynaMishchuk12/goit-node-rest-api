import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/registerSchema.js";
import {
  registerUser,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { emailSchema } from "../schemas/emailSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.post("/login", validateBody(registerUserSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
