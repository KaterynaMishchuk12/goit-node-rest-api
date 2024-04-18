import Joi from "joi";

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const registerUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
  subscription: Joi.string(),
});
