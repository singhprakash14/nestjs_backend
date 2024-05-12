require('module-alias/register')
const express = require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const dotenv = require('dotenv');
dotenv.config()
mongoose.set("strictQuery", false);
mongoose.promise = global.Promise
app.use(cors());
require('./src/config/database')
require('./src/models/models')
app.use(require('./src/routes'))


// Import and use the logRequest middleware


const logRequest = require('@middleware/logrequest'); // Adjust the path as needed
app.use(logRequest);
app.use(require('./src/routes'))

const PORT = process.env.PORT
app.listen(PORT, function () {
  console.log('Server listening on port ', PORT);
})