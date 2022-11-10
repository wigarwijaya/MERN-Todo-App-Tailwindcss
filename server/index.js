const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//port
const PORT = process.env.PORT || 3000

//use cors to allow access from different address (localhost:3000 => localhost:5000)
app.use(cors())

//Lets import routes
const TodoItemRoute = require('./routes/todoItems')

//Connect to mongodb ..
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database Connected!"))
.catch(err => console.log(err))

app.use('/', TodoItemRoute);

//Add Port and connect to server
app.listen(PORT, () => console.log('Server connected!'));