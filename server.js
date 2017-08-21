// Node dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

// Initializing an Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Syncing models
var db = require("./models");

// Express app data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api.json" }));

// Serve static content
app.use(express.static(__dirname + "/public"));

// Override with POST having ?_method=PUT
app.use(methodOverride("_method"));

// Set Handlebars as the View Engine.
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);

// Starting Server
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on port " + PORT);
    });
});