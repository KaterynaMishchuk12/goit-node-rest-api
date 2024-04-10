import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "./HttpError.js";
import { User } from "../models/userModel.js";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, secretKey);
    const user = await User.findById(id);
    if (!user) throw HttpError(401, "Not authorized");

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
