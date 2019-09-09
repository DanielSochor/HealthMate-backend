require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

//enables pre-flight across the board
//app.options('*', cors());

app.use(cors());
// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin','*');
//   response.header('Access-Control-Allow-Headers: *', 'Origin, X-Requested-With, Content-Type, Accept');
//   response.header('Access-Control-Allow-Credentials', true);
//   response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
//   next();
// });

// var whitelist = ['https://healthy-people-front-end.herokuapp.com/']
// var corsOptionsDelegate = function (request, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(request.header('Origin')) !== -1){
//     corsOptions = { origin: true }
//   } else {
//     corsOptions = { origin: false }
//   }
//   callback(null, corsOptions)
// }

// app.use(cors(corsOptionsDelegate));

const path = require('path');
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, '/config/config.static.json'))[env];
const PORT = process.env.PORT || 3001;

// Define middleware here
//app.use(cors());
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