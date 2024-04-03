const mongoose = require('mongoose');
//schema is like table in Mongodb
const Schema = mongoose.Schema;

const  BookSchema = new Schema({

    //columns Declaration
    BookName: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    Rating: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Books',BookSchema)
module.exports = Book