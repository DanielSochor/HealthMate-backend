//creates database connection
var mysql = require("mysql");
var config = require("./config");

var connection = mysql.createConnection(config.mysql.url);
connection.connect(function (error) {
    if (error) throw error;
    console.log("connected to database on " + connection.config.host + " as "
        + connection.config.user + "@" + connection.config.database);
        console.log("connect as id" + connection.threadId);
});

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL)
// } else {
//   var connection = mysql.createConnection(config.mysql.url); 
// }

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

module.exports = connection;