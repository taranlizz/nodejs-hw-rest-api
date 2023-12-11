import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js";
import { userAuthSchema } from "../../schemas/auth-schemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userAuthSchema),
  authController.register
);

authRouter.post("/login", validateBody(userAuthSchema), authController.login);

export default authRouter;
