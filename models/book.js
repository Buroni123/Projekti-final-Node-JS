const Sequelize = require("sequelize");
const sequelize = require("./../database");
const Category = require("./category");

const Book = sequelize.define(
  "book",
  {
    title: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING(30),
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

Book.hasMany(Category, {foreignKey: "status", sourceKey: "status"})
Category.belongsTo(Book, {foreignKey: "status", targetKey: "status"})

module.exports = Book
