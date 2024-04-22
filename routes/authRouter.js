import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/registerSchema.js";
import {
  registerUser,
  login,
  getCurrent,
  logout,
  updateAvatar,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),

  registerUser
);
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
