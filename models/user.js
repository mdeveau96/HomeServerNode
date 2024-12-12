import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../services/db";

const phoneValidationRegex = /\d{3}\d{3}\d{4}/;

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      validator: function (v) {
        return phoneValidationRegex.test(v);
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// const getUsersFromDB = (callback) => {
//   let users;
//   try {
//     users = query("SELECT * FROM users;");
//   } catch (err) {
//     console.error(`Error querying users: ${err}`);
//     return callback([]);
//   }
//   callback(users);
// };

// export class User {
//   constructor(username, email, phoneNumber, password) {
//     this.user_name = username;
//     this.email = email;
//     this.phoneNumber = phoneNumber;
//     this.password = password;
//   }
//   save() {

//   }
//   static fetchAll(callback) {
//     getUsersFromDB(callback);
//   }
//   static findById(id, callback) {
//     getUsersFromDB((users) => {
//       const user = users.find((u) => u.id === id);
//       callback(user);
//     });
//   }
// }
