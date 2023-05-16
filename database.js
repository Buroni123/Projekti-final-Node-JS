const Sequelize = require("sequelize");

const sequelize = new Sequelize("e-bibloteka", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate((then) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
