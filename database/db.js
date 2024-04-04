 //Group 10 
//Dharini Vaghela -200533763
//Nancy Dungrani-200530960

const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Connection failed!");
      console.error(error);
     
    });
};