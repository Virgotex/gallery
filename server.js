require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Load routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize the app
const app = express();

// Connect to MongoDB using the URI from config
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Database connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// View engine setup
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
