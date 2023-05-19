import { Response } from "express";

export class RequestError {
  static notProvided(res: Response<any, Record<string, any>>, arg1: string) {
    throw new Error("Method not implemented.");
  }
  public static fieldNotProvided(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      message: field + " was not provided",
    });
  }

  public static notFound(res: Response, entity: string) {
    return res.status(404).send({
      ok: false,
      message: entity + " not found",
    });
  }
}
