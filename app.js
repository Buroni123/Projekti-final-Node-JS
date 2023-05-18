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

sequelize.sync()
app.listen(3000)
