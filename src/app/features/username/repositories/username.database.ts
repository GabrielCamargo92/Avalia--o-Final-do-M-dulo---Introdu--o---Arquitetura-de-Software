import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Username } from "../../../models/username.model";
import { UsernameEntity } from "../../../shared/database/entities/username.entity";

export class UsernameDatabase {
  private repository = TypeormConnection.connection.getRepository(UsernameEntity);

  public async list(): Promise<Username[]> {
    const result = await this.repository.find({
      relations: ["notes"],
    });
    return result.map((username) => this.mapEntityToModel(username));
  }

  public async login(username: string, senha: string) {
    const result = await this.repository.findOne({
      where: {
        username,
        senha,
      },
    });
    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  private mapEntityToModel(entity: UsernameEntity): Username {
    // const userNotes = entity.notes;
    // const notes = userNotes.map((item) => {
    //   NoteDatabase.mapEntityToModel(item);
    // });

    return Username.create(entity.id, entity.username, entity.senha);
  }

  public async getUserById(id: string): Promise<Username | null> {
    const result = await this.repository.findOneBy({
      id,
    });
    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(user: Username) {
    const userEntity = this.repository.create({
      id: user.idUser,
      username: user.username,
      senha: user.password,
    });

    const result = await this.repository.save(userEntity);

    return this.mapEntityToModel(result);
  }

  public async delete(id: string): Promise<number> {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async update(id: string, data?: any): Promise<number> {
    const result = await this.repository.update(
      {
        id,
      },
      {
        username: data.username,
        senha: data.password,
      }
    );
    return result.affected ?? 0;
  }
}
