const Sequelize = require("sequelize");
const sequelize = require("./../database");

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

module.exports = Issuebook
