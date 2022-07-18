import { Router } from "express";
import notesController from "../controllers/notesController.js";
import validateJWT from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import notesSchemas from "../schemas/notesSchemas.js";

const notesRouter = Router();
notesRouter.post(
  "/notes",
  validateSchema(notesSchemas.createNoteSchema),
  validateJWT,
  notesController.createNote
);
notesRouter.get("/notes", validateJWT, notesController.getUserNotes);
notesRouter.get("/notes/:id", validateJWT, notesController.getNoteById);
notesRouter.delete("/notes/:id", validateJWT, notesController.deleteUserNote);

export default notesRouter;
