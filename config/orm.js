// Object-relational Mapping (ORM) for Eat-Da-Burger

var connection = require('./connection.js')

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the key sand push the key/value as a string int arr 
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}


// Creates an ORM object in order to perform generic database queries
// these generic queries will later be used by the module and controller
// to conduct specific database queries by passing specific database, table, and value information.
var orm = {
    // Selects all of the data in a table
    selectAll: function(tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Adds a new row to a table
    insertOne: function(tableName, col, val, cb) {
        var queryString = "INSERT INTO " + tableName;
        
        queryString += " (" + col.toString() + ") ";
        queryString += "VALUES (?);";
        
        console.log(queryString);

        connection.query(queryString, val, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // Edits a value in the table
    updateOne: function(tableName, objColVals, condition, cb) {
        // UPDATE <table> SET <col> = <value> WHERE <condition>
        var queryString = "UPDATE " + tableName;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition + ";";

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

// Export for use in the model (burger.js)
module.exports = orm;