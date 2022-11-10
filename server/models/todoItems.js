//import mongoose to create new Schema
const mongoose = require('mongoose');

//Create Schema
const { Schema } = mongoose;

const TodoItemSchema = new Schema({
    item:{
        type: String,
        required: true
    }
})

//Export this schema
module.exports = mongoose.model('todo', TodoItemSchema)