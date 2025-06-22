const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// Connecting to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('MongoDB error:', err);
    } else {
        console.log(`✅ Connected to MongoDB: ${MONGODB_URI}`);
    }
});

// Set view engine
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// ✅ Don't start the server here
module.exports = app;
