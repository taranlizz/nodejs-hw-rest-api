import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import { userAuthSchema } from "../../schemas/auth-schemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userAuthSchema),
  authController.register
);

authRouter.post("/login", validateBody(userAuthSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
