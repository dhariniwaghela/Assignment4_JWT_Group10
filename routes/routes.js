//Group 10 
//Dharini Vaghela -200533763
//Nancy Dungrani-200530960

require("dotenv").config();
require("../database/db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const User = require("../models/models");
const app = express();

const Book = require('../models/book');

app.use(express.json());

// Register user
app.post("/register", async (req, res) => {

  
    try {
      // Get user credentials
      const { firstName, lastName, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && firstName && lastName)) {
        res.status(400).send("All fields are mandatory");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const CheckUser = await User.findOne({ email });
  
      if (CheckUser) {
        return res.status(409).send("User is already registered");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15m",
        }
      );
      // save user token
      user.token = token;
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    
  });

// Login
app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15m",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
   
  } catch (err) {
    console.log(err);
  }
  
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to Week9-JWT Authentication");
});

//Crud operation on book database

//create
app.post("/create",async (req, res) => {
  try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.status(200).json(newBook);
  } catch (err) {
      console.error(err); // Log any errors
      res.status(400).json({ message: err.message });
  }
});

// get all books
app.get ("/getallbooks", async (req, res) => {
  try {
      const books = await Book.find();
      res.json(books);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


app.put("/updateBook/:id" , async (req, res) => {
  try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(book);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

app.delete("/deleteBook/:id", async (req, res) => {
  try {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
module.exports = app;