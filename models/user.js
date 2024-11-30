import { query } from "../services/db.js";

const getUsersFromDB = (callback) => {
  let users;
  try {
    users = query("SELECT * FROM users;").all();
  } catch (err) {
    console.error(`Error querying users: ${err}`);
    return callback([]);
  }
  callback(users);
};

export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  save() {}
  static fetchAll(callback) {
    getUsersFromDB(callback);
  }
}
