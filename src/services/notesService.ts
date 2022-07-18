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

const notesService = { create };
export default notesService;
