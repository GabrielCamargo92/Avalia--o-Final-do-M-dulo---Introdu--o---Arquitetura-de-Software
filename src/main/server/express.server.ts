import { serverEnv } from "../../app/envs/server.env";
import { createApp } from "../config/express.config";
import { TypeormConnection } from "../database/typeorm.connection";
import { Express } from "express";

export class AppServer {
  private static app: Express;
  public static run() {
    AppServer.app = createApp();

    Promise.all([TypeormConnection.connect()]).then(this.listen);
  }

  private static listen() {
    AppServer.app.listen(serverEnv.port, () => console.log("server is running"));
  }
}
