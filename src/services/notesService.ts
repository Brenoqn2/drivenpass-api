import notesRepository from "../repositories/notesRepository.js";

async function create(title: string, content: string, userId: number) {
  const note = { title, content, userId };
  const alreadyUsedTitle = await notesRepository.getNoteByTitleAndId(
    title,
    userId
  );
  if (alreadyUsedTitle) {
    throw {
      type: "error_conflict",
      message: "Title already used",
    };
  }
  await notesRepository.createNote(note);
}

async function getNoteById(id: number, userId: number) {
  const note = await notesRepository.getNoteById(id);
  if (!note) {
    throw {
      type: "error_not_found",
      message: "Note not found",
    };
  }
  if (note.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to access this note",
    };
  }
  return note;
}

async function getUserNotes(userId: number) {
  const notes = await notesRepository.getUserNotes(userId);
  return notes;
}

async function deleteNote(id: number, userId: number) {
  const note = await notesRepository.getNoteById(id);
  if (!note) {
    throw {
      type: "error_not_found",
      message: "Note not found",
    };
  }
  if (note.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to delete this note",
    };
  }
  await notesRepository.deleteNote(id);
}

const notesService = { create, getNoteById, getUserNotes, deleteNote };
export default notesService;
