import { Router } from "express";
import { NoteController } from "../controller/notes.controller";

// http://localhost:4444/
export const notesRoutes = () => {
  const app = Router();

  //notas
  app.get("/:idUser/userNotes", new NoteController().listAll);

  // app.get("/:idUser/userNotes", new NotesController().notesFilter);

  app.get("/:id/Notes", new NoteController().listOne);

  app.post("/:idUser/userNotes", new NoteController().create);

  app.put("/:idUser/userNotes/:noteId", new NoteController().update);

  app.delete("/:idUser/userNotes/:noteId", new NoteController().delete);

  return app;
};
