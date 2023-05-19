import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Notes } from "../../../models/notes.model";
import { NoteEntity } from "../../../shared/database/entities/note.entity";

export class NoteDatabase {
  private repository = TypeormConnection.connection.getRepository(NoteEntity);

  public async list(description?: string) {
    const result = await this.repository.find({
      where: {
        description,
      },
      relations: ["user"],
    });

    return result.map((note) => this.mapEntityToModel(note));
  }

  private mapEntityToModel(entity: NoteEntity): Notes {
    return Notes.create(entity.id, entity.description, entity.detailing, entity.filed);
  }

  public async getNoteById(id: string): Promise<Notes | null> {
    const result = await this.repository.findOne({ where: { id } });
    console.log(result);

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(userId: string, note: Notes) {
    const noteEntity = this.repository.create({
      id: note.id,
      description: note.description,
      detailing: note.detailing,
      filed: note.filed,
      idUser: userId,
    });

    const result = await this.repository.save(noteEntity);
    return this.mapEntityToModel(result);
  }

  public async update(idUser: string, noteId: string, note?: Notes) {
    const result = await this.repository.update(
      {
        idUser,
        id: noteId,
      },
      {
        description: note?.description,
        detailing: note?.detailing,
        filed: note?.filed,
      }
    );

    if (result.affected === 1) {
      return {
        idUser,
        ...note,
        noteId,
      };
    }

    return null;
  }

  public async delete(id: string) {
    const result = await this.repository.delete({
      id,
    });
    return result.affected ?? 0;
  }
}
