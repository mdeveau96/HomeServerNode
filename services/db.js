import { Sequelize } from "sequelize";
import { SqliteDialect } from "@sequelize/sqlite3";

export const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: "file.db",
});
