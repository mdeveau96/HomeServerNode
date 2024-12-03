import { run } from "../services/db.js";

export const createUser = (user) => {
  const stmt = `INSERT INTO users (user_name, email, phoneNumber, password) VALUES ('${user.user_name}', '${user.email}', '${user.phoneNumber}', '${user.password}');`;
  const result = run(stmt);
  if (!result.changes) {
    return "Error in creating user";
  }
  return "User uploaded successfully";
};

export const updateUser = (objectId, user) => {
  const stmt = `UPDATE users SET user_name = ${user.user_name}, email = ${user.email}, phoneNumber = ${user.phoneNumber}, password = ${user.password} WHERE id = ${objectId}`;
};
