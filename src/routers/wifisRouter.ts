import { Router } from "express";
import wifisController from "../controllers/wifisController.js";
import validateJWT from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import wifisSchemas from "../schemas/wifisSchemas.js";

const wifisRouter = Router();
wifisRouter.post(
  "/wi-fi",
  validateSchema(wifisSchemas.createWifiSchema),
  validateJWT,
  wifisController.create
);

export default wifisRouter;
