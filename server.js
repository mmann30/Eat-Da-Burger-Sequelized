// Node dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

// Initializing an Express app
var app = express();

// Establishing a PORT
var PORT = process.env.PORT || 3000;

// Serve static content
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=PUT
app.use(methodOverride("_method"));

// Set Handlebars as the View Engine.
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routing
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

// Starting Server
app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});