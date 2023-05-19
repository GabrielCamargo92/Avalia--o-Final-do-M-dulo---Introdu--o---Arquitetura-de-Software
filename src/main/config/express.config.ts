import express from "express";
import cors from "cors";
import { userRoutes } from "../../app/features/username/routes/user.routes";
import { notesRoutes } from "../../app/features/notes/routes/notes.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/user", userRoutes());
  app.use("/user", notesRoutes());

  return app;
};
