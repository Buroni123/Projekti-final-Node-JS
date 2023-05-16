const Sequelize = require("sequelize");
const sequelize = require("./../database");

const Admin = sequelize.define(
  "admin",
  {
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Admin
