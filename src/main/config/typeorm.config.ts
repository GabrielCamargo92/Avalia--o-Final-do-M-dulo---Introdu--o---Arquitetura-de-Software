import { DataSource } from "typeorm";
import { databaseEnv } from "../../app/envs/database.env";

let entities = "src/app/shared/database/entities/**/*.ts";
let migrations = "src/app/shared/database/migrations/**/*.ts";

if (databaseEnv.nodeEnv !== "dev") {
  entities = "build/app/shared/database/entities/**/*.ts";
  migrations = "build/app/shared/database/migrations/**/*.ts";
}

export default new DataSource({
  type: "postgres",
  port: 5432,
  host: databaseEnv.host,
  username: databaseEnv.username,
  password: databaseEnv.password,
  database: databaseEnv.database,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: [entities],
  migrations: [migrations],
  schema: "testeMigrations",
});
