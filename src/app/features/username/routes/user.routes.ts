import { Router } from "express";
import { UsernameController } from "../controller/username.controller";
import { UserValidatorMiddleware } from "../../../shared/middlewares/user-validator.middleware";

// http://localhost:4444/
export const userRoutes = () => {
  const app = Router();

  // GET http://localhost:4444/

  app.get("/", new UsernameController().list);

  // GET http://localhost:4444/
  app.post(
    "/login",
    UserValidatorMiddleware.validateMandatoryFields,
    new UsernameController().login
  );

  // POST http://localhost:4444/
  app.post(
    "/createLogin",
    [UserValidatorMiddleware.validateMandatoryFields],
    new UsernameController().create
  );

  // DELETE http://localhost:4444/user/abc-1234
  app.delete("/:idUser", new UsernameController().delete);

  return app;
};
