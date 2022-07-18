import { Request, Response } from "express";
import notesService from "../services/notesService.js";

async function createNote(req: Request, res: Response) {
  const { title, content, userId } = req.body;
  await notesService.create(title, content, userId);
  res.sendStatus(201);
}

async function getNoteById(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "Note not found",
    };
  }
  const { userId } = req.body;
  const note = await notesService.getNoteById(Number(id), userId);
  res.send(note);
}

async function getUserNotes(req: Request, res: Response) {
  const { userId } = req.body;
  const credentials = await notesService.getUserNotes(userId);
  res.send(credentials);
}

const notesController = { createNote, getUserNotes, getNoteById };
export default notesController;
