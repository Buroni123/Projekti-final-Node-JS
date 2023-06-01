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

    if (name.length < 4 || name.length > 20) {
      return res.status(400).json({
        status: 0,
        message: "Name must be between 4 and 20 characters long!"
      })
    }

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

app.post('/categories', (req,res)=>{
  let name = req.body.name
  let status = req.body.status

  Category.create({
    name,
    status,
  })
  .then((newCategory) => {
    res.status(200).json({
      status: 1,
      data: newCategory
    })
  })
  .catch((err)=>{
    res.status(400).json({
      status: 0,
      data: err.message,
    })
  })
})

app.get('/categories', (req,res)=>{
  Category.findAll()
  .then((categories)=>{
    res.status(200).json({
      status: 1,
      data: categories,
    })
  })
  .catch((err)=>{
    res.status(400).json({
      status: 0,
      data: err.message,
    })
  })
})

app.post('/books', (req,res)=>{
  let title = req.body.title
  let description = req.body.description
  let amount = req.body.amount
  let coverImage = req.body.coverImage
  let author = req.body.author
  let status = req.body.status
  let categoryId = req.body. categoryId

  Book.create({
    title,
    description,
    amount,
    coverImage,
    author,
    status,
    categoryId,
  })
  .then((newBook)=>{
    res.status(200).json({
      status: 1,
      data: newBook,
    })
  })
  .catch((err)=>{
    res.status(400).json({
      status: 0,
      data: err.message,
    })
  })
})

app.get("/books", (req, res) => {
  Book.findAll()
    .then((books) => {
      res.status(200).json({
        status: 1,
        data: books,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 0,
        data: err.message,
      });
    });
});

app.post("/users/:userId/take-book/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found",
        });
      }

      Book.findByPk(bookId)
        .then((book) => {
          if (!book) {
            return res.status(404).json({
              status: 0,
              message: "Book not found",
            });
          }

          if (book.amount <= 0) {
            return res.status(400).json({
              status: 0,
              message: "No available copies of the book",
            });
          }
            
          //i kaam jap keto vlera per testim
          const daysIssued = 7;
          const issueDate = new Date();
          const isReturned = false;
          const returnedDate = new Date();

          book
            .decrement("amount")
            .then(() => {
              Issuebook.create({
                userId: userId,
                bookId: bookId,
                daysIssued: daysIssued,
                issueDate: issueDate,
                isReturned: isReturned,
                returnedDate: returnedDate,
              })
                .then((issue) => {
                  res.status(200).json({
                    status: 1,
                    message: "Book successfully issued",
                    data: issue,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 0,
                    message: "An error occurred while issuing the book",
                    error: err.message,
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                status: 0,
                message: "An error occurred while updating the book",
                error: err.message,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            status: 0,
            message: "An error occurred while retrieving the book",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "An error occurred while retrieving the user",
        error: err.message,
      });
    });
});

app.post("/users/:userId/return-book/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found",
        });
      }

      Book.findByPk(bookId)
        .then((book) => {
          if (!book) {
            return res.status(404).json({
              status: 0,
              message: "Book not found",
            });
          }

          Issuebook.findOne({
            where: {
              userId: userId,
              bookId: bookId,
              isReturned: false,
            },
          })
            .then((issue) => {
              if (!issue) {
                return res.status(400).json({
                  status: 0,
                  message: "The book is already returned",
                });
              }

              issue
                .update({
                  isReturned: true,
                  returnedDate: new Date(),
                })
                .then((updatedIssue) => {
                  book
                    .increment("amount")
                    .then(() => {
                      res.status(200).json({
                        status: 1,
                        message: "Book successfully returned",
                        data: updatedIssue,
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        status: 0,
                        message: "An error occurred while updating the book",
                        error: err.message,
                      });
                    });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 0,
                    message:
                      "An error occurred while updating the issue record",
                    error: err.message,
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                status: 0,
                message: "An error occurred while checking the issue record",
                error: err.message,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            status: 0,
            message: "An error occurred while retrieving the book",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "An error occurred while retrieving the user",
        error: err.message,
      });
    });
});


sequelize.sync()
app.listen(3000)
