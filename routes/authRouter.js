// authRouter.js
import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/registerSchema.js";
import {
  registerUser,
  login,
  getCurrent,
  logout,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);
authRouter.post("/login", validateBody(registerUserSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);

export default authRouter;
