//loads environmental variables into process.env global variable injected by node at runtime
require('dotenv').config();
require("./config/connection");
var cors = require('cors')

const express = require("express");
const app = express();
app.use(cors())
const path = require("path");
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, './config/config.static.json'))[env];
const PORT = process.env.PORT || 3001;

var logger = require('morgan')
app.use(logger("dev"));

// Define middleware here
// when set to true, the URL-encoded data will parsed with the qs library instead of the querystring library
app.use(express.urlencoded({ extended: true }));
// this is a built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../healthy-front-end/build"));
}
app.use(express.static(path.join(__dirname, reactConfig))); // serving react files

// Define API routes here
require("./controllers/routes")(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../healthy-front-end/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

