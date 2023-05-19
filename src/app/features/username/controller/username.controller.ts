import { Request, Response } from "express";
import { RequestError } from "../../../shared/errors/request.error";
import { UsernameDatabase } from "../repositories/username.database";
import { Username } from "../../../models/username.model";
import { SuccessResponse } from "../../../shared/util/success.response";
import { ServerError } from "../../../shared/errors/generic.error";

export class UsernameController {
  public create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const database = new UsernameDatabase();

      const user = new Username(username, password);
      database.create(user);

      return SuccessResponse.created(res, "User was successfully create", user.toJson());
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password, logged } = req.body;

      const database = new UsernameDatabase();
      const user = await database.login(username, password);

      if (!user) {
        return RequestError.notFound(res, "User");
      }
      user.logged = true;
      res.status(200).send({
        ok: true,
        message: "User successfully obtained",
        data: {
          id: user.idUser,
          username: user.username,
          logged: user.logged,
          // notes: user.notes,
        },
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const database = new UsernameDatabase();
      let users = await database.list();
      const result = users.map((user) => user.toJson());
      res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: result,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return RequestError.notProvided(res, "User id");
      }

      const database = new UsernameDatabase();
      const result = await database.delete(userId);

      if (result === 0) {
        return RequestError.notFound(res, "User");
      }

      return SuccessResponse.ok(res, "User successfully deleted", userId);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  // public async delete(req: Request, res: Response) {
  //   try {
  //     const { idUser } = req.params;

  //     const database = new UsernameDatabase();
  //     const userIndex = database.create(idUser);

  //     if (userIndex < 0) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User not found",
  //       });
  //     }

  //     await database.delete(userIndex);

  //     return SuccessResponse.ok(res, "User was successfully deleted", userIndex);
  //   } catch (error: any) {
  //     return ServerError.genericError(res, error);
  //   }
  // }
}
