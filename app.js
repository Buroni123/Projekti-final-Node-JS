const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('./database')
const User = require('./models/user')
const Admin = require("./models/admin");
const Book = require("./models/book");
const Issuebook = require("./models/issuebook");
const Category = require("./models/category");
const crypto = require('crypto')
const bcrypt = require("bcrypt")

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.post('/users', (req,res) => {
    let name = req.body.name
    let email = req.body.email;
    let gender = req.body.gender;
    let address = req.body.address;
    let status = req.body.status;
    let password = bcrypt.hashSync(req.body.password, 6)
    User.findOne({
        where: {
            name,
            email,
            address,
        }
    })
    .then((user)=>{
        if(user) {
            res.status(400).json({
                data: "User already exists"
            })
        }
        else{
            User.create({
                name,
                email,
                gender,
                address,
                status,
                password,
        })
        .then((newUser) => {
        res.status(200).json({
            status: 1,
            data: newUser   ,
            })
          })
        .catch((err) => {
        res.status(400).json({
            status:0,
            data: err.message
            })
          })
      }
    })
    .catch((err) => {
        res.status(400).json({
            status:0,
            data: err.message
      })
    })
})

app.delete("/users/:id", (req, res) => {
  let userId = req.params.id;

  User.destroy({
    where: {
      id: userId,
    },
  })
    .then((deletedUserCount) => {
      if (deletedUserCount === 0) {
        res.status(404).json({
          status: 0,
          message: "User not found",
        });
      } else {
        res.status(200).json({
          status: 1,
          message: "User deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "An error occurred while deleting the user",
        error: err.message,
      });
    });
});

app.put('/users/:id', (req,res) => {
    let userId = req.params.id
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let address = req.body.address;
    let status = req.body.status;
    let password = req.body.password
    User.update({
      name,
      email,
      gender,
      address,
      status,
      password,
    },
    {
        where: {
            id: userId
        }
    })
    .then((user)=>{
        res.status(200).json({
            status: 1,
            message: "User updated successfully!"
        })
    })
    .catch((err) => {
        res.status(400).json({
            status: 0,
            data: err.message
        })
    })
})

sequelize.sync()
app.listen(3000)
