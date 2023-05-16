const Sequelize = require("sequelize");
const sequelize = require("./../database");

const User = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("Aktiv", "Jo aktiv"),
      defaultValue: "Aktiv",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User