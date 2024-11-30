import sqlite from "better-sqlite3";
import path from "path";

const DB = new sqlite(path.resolve("file.db"), { fileMustExist: true });

export const query = (sql) => {
  return DB.prepare(sql);
};

export const run = (sql) => {
  return DB.prepare(sql).run();
};
