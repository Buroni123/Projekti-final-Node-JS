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

Book.hasMany(Issuebook, { foreignKey: {allowNull:false}, sourceKey: "status" });
Issuebook.belongsTo(Book, { foreignKey: {allowNull:false}, targetKey: "status" });

User.hasMany(Issuebook, { foreignKey: {allowNull:false}, sourceKey: "status" });
Issuebook.belongsTo(User, { foreignKey: {allowNull:false}, targetKey: "status" });

module.exports = Issuebook
