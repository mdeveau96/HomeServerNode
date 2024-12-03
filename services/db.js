import { DB } from "../app.js";

export const query = (sql) => {
  return DB.prepare(sql).all();
};

export const run = (sql) => {
  return DB.prepare(sql).run();
};
