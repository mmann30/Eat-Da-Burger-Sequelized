var express = require('express');
var burger = require('../models/burger.js');

var router = express.Router();

// Routes

// Gets the main data for populating the home page.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Posts data to the server to create a new burger
router.post("/", function(req, res) {
    burger.create("burger_name", req.body.name, function() {
        res.redirect("/");
    });
});

// Updates data on the server to change the status of a burger
router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);
    
    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
})
// Export routes for use in server.js
module.exports = router;