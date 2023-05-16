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
    let password = bcrypt.hashSync(req.body.password, 6)
})

sequelize.sync()
app.listen(3000)
