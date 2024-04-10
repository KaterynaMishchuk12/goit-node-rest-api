// authRouter.js
import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/registerSchema.js";
import { registerUser, login } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);
authRouter.post("/login", login);

export default authRouter;
