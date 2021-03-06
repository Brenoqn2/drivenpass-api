import { Router } from "express";
import credentialsController from "../controllers/credentialsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateJWT from "../middlewares/authMiddleware.js";
import credentialsSchemas from "../schemas/credentialsSchemas.js";

const credentialsRouter = Router();
credentialsRouter.post(
  "/credentials",
  validateSchema(credentialsSchemas.createSchema),
  validateJWT,
  credentialsController.create
);
credentialsRouter.get(
  "/credentials",
  validateJWT,
  credentialsController.getUserCredentials
);
credentialsRouter.get(
  "/credentials/:id",
  validateJWT,
  credentialsController.getCredentialById
);
credentialsRouter.delete(
  "/credentials/:id",
  validateJWT,
  credentialsController.deleteUserCredential
);

export default credentialsRouter;
