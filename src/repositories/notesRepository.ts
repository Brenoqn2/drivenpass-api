import prisma from "../database.js";
import { Notes } from "@prisma/client";
type CreateNote = Omit<Notes, "id" | "createdAt">;

async function createNote(note: CreateNote) {
  await prisma.notes.create({
    data: {
      title: note.title,
      content: note.content,
      userId: note.userId,
    },
  });
}

async function getNoteByTitleAndId(title: string, userId: number) {
  const title_userId = { title, userId };
  const note = await prisma.notes.findUnique({
    where: {
      title_userId,
    },
  });
  return note;
}

async function getUserNotes(userId: number) {
  const notes = await prisma.notes.findMany({
    where: {
      userId,
    },
  });
  return notes;
}

async function getNoteById(id: number) {
  const note = await prisma.notes.findUnique({
    where: {
      id,
    },
  });
  return note;
}

async function deleteNote(id: number) {
  await prisma.notes.delete({
    where: {
      id,
    },
  });
}

const notesRepository = {
  createNote,
  getNoteByTitleAndId,
  getUserNotes,
  getNoteById,
  deleteNote,
};

export default notesRepository;
