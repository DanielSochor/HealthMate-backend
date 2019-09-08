require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, '/config/config.static.json'))[env];
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(cors());
app.use(express.static(path.join(__dirname, reactConfig))); // serving react files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("https://healthy-people-front-end.herokuapp.com/"));
}

// Routes
require('./controllers/routes')(app);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);