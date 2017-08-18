// Node to MySQL database connection
var mysql = require('mysql');
var connection;
//////////////////////////////////////////
// JawsDB/Heroku Connection
//////////////////////////////////////////
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //need to provide local password
    database: "burgers_db"
    });
};

connection.connect(function(err) {
    if (err) {
        console.error('error connection: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// Export for use in ORM.js
module.exports = connection;


