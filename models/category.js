const Sequelize = require("sequelize");
const sequelize = require("./../database");
const Book = require("./book");

const Category = sequelize.define(
  "category",
  {
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
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

module.exports = Category
