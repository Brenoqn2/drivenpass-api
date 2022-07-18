import { Router } from "express";
import cardsController from "../controllers/cardsController.js";
import validateJWT from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import cardsSchemas from "../schemas/cardsSchemas.js";

const cardsRouter = Router();
cardsRouter.post(
  "/cards",
  validateSchema(cardsSchemas.createCardSchema),
  validateJWT,
  cardsController.create
);
cardsRouter.get("/cards", validateJWT, cardsController.getUserCards);
cardsRouter.get("/cards/:id", validateJWT, cardsController.getCardById);

export default cardsRouter;
