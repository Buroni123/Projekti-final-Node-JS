const Sequelize = require("sequelize");
const sequelize = require("./../database");
const Book = require("./book");
const User = require("./user")

const Issuebook = sequelize.define(
  "issuebook",
  {
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    daysIssued: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    issueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isReturned: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returnedDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Book.hasMany(Issuebook, { foreignKey: {allowNull:false}, sourceKey: "id" });
Issuebook.belongsTo(Book, { foreignKey: {allowNull:false}, targetKey: "id" });

User.hasMany(Issuebook, { foreignKey: {allowNull:false}, sourceKey: "id" });
Issuebook.belongsTo(User, { foreignKey: {allowNull:false}, targetKey: "id" });

module.exports = Issuebook
