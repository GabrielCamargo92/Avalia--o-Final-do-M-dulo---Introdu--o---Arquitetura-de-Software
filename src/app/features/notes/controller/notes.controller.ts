import { Request, Response } from "express";
import { RequestError } from "../../../shared/errors/request.error";
import { Notes } from "../../../models/notes.model";
import { NoteDatabase } from "../repositories/notes.database";
import { UsernameDatabase } from "../../username/repositories/username.database";
import { SuccessResponse } from "../../../shared/util/success.response";
import { ServerError } from "../../../shared/errors/generic.error";

export class NoteController {
  public async listAll(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { description, filed } = req.query;

      const database = new NoteDatabase();
      let noteList = await database.list(description ? String(description) : undefined);

      let isFiled: any = undefined;

      if (filed !== undefined && filed !== "") {
        isFiled = filed?.toString().toLowerCase() === "true";
        // noteList = noteList.filter((note) => note.filed === isFiled);
      }

      return SuccessResponse.ok(res, "Notes successfully listed", noteList);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async listOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const noteDatabase = new NoteDatabase();
      const note = await noteDatabase.getNoteById(id);

      return SuccessResponse.ok(res, "Note successfully listed", note);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { description, detailing } = req.body;

      const userDatabase = new UsernameDatabase();
      const user = await userDatabase.getUserById(idUser);

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      const note = new Notes(description, detailing);
      const noteDatabase = new NoteDatabase();
      const result = await noteDatabase.create(idUser, note);

      return SuccessResponse.created(res, "Note successfully created", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { idUser, noteId } = req.params;

      // const database = new UserDatabase();
      // const user = database.getUserId(userId);

      // const noteList = user!.notes;

      // const noteIndex = noteList.findIndex(
      //   (note) => note.id === noteId
      // );

      // if (noteIndex < 0) {
      //   return RequestError.notFound(res, "Note");
      // }

      // const noteDeleted = noteList.splice(
      //   noteIndex!,
      //   1
      // );
      const database = new NoteDatabase();
      const result = await database.delete(noteId);

      if (result === 0) {
        return RequestError.notFound(res, "Note");
      }

      return SuccessResponse.ok(res, "Note successfully deleted", noteId);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { idUser, noteId } = req.params;
      const { description, detailing, filed } = req.body;

      const userDatabase = new UsernameDatabase();
      const user = userDatabase.getUserById(idUser);

      const data = {
        description,
        detailing,
        filed,
      };
      const noteDatabase = new NoteDatabase();
      const result = await noteDatabase.update(idUser, noteId);

      // const noteList = user?.notes;
      // const note = noteList?.find(
      //   (note) => note.id === noteId
      // );

      // if (title) {
      //   note!.title = title;
      // }

      // if (description) {
      //   note!.description = description;
      // }

      // if (filed !== undefined) {
      //   note!.filed = filed;
      // }

      return SuccessResponse.ok(res, "Note successfully updated", {
        result,
        // noteList
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
