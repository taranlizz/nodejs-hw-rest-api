import Joi from "joi";
import { ErrorMessage } from "./errorMessage.js";
import { emailRegex } from "../models/User.js";

export const userAuthSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages(ErrorMessage("email")),
  password: Joi.string()
    .min(6)
    .required()
    .messages(ErrorMessage("password", 6)),
});
