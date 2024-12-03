import { query } from "../services/db.js";

const getUsersFromDB = (callback) => {
  let users;
  try {
    users = query("SELECT * FROM users;");
  } catch (err) {
    console.error(`Error querying users: ${err}`);
    return callback([]);
  }
  callback(users);
};

export class User {
  constructor(username, email, phoneNumber, password) {
    this.user_name = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
  save() {
    
  }
  static fetchAll(callback) {
    getUsersFromDB(callback);
  }
  static findById(id, callback) {
    getUsersFromDB((users) => {
      const user = users.find((u) => u.id === id);
      callback(user);
    });
  }
}
