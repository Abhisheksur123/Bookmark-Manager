const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// API routes
const bookmarksRouter = require('./routes/bookmarks');
app.use('/bookmarks', bookmarksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
