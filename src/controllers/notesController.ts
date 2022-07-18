import { Request, Response } from "express";
import notesService from "../services/notesService.js";

async function createNote(req: Request, res: Response) {
  const { title, content, userId } = req.body;
  await notesService.create(title, content, userId);
  res.sendStatus(201);
}

const notesController = { createNote };
export default notesController;
