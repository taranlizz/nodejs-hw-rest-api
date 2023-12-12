import Joi from "joi";
import { ErrorMessage } from "./errorMessage.js";

export const addContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages(ErrorMessage("name", 2)),
  email: Joi.string().email().required().messages(ErrorMessage("email")),
  phone: Joi.string().required().messages(ErrorMessage("phone")),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).messages(ErrorMessage("name", 2)),
  email: Joi.string().email().messages(ErrorMessage("email")),
  phone: Joi.string().messages(ErrorMessage("phone")),
  favorite: Joi.boolean(),
});

export const patchContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});
