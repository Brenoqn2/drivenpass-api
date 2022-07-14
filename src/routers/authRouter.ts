import { Router } from "express";
import authController from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();
authRouter.post(
  "/register",
  validateSchema(authSchemas.registerSchema),
  authController.register
);
authRouter.post(
  "/login",
  validateSchema(authSchemas.loginSchema),
  authController.login
);

export default authRouter;
