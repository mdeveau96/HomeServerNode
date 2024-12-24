import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../services/db.js";

const phoneValidationRegex = /\d{3}\d{3}\d{4}/;

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
