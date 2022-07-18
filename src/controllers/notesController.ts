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
  const notes = await notesService.getUserNotes(userId);
  res.send(notes);
}

async function deleteUserNote(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "Note not found",
    };
  }
  const { userId } = req.body;
  await notesService.deleteNote(Number(id), userId);
  res.sendStatus(204);
}

const notesController = {
  createNote,
  getUserNotes,
  getNoteById,
  deleteUserNote,
};
export default notesController;
