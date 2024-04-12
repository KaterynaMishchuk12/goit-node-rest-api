import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import HttpError from "../helpers/HttpError.js";
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
    if (!user || !user.token || user.token !== token)
      throw HttpError(401, "Not authorized");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
