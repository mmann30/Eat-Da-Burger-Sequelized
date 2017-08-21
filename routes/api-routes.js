// Dependencies
var db = require("../models");

// Routes
module.exports = function(app) {
    // displays db data on the homepage
    app.get("/", function(req, res) {
        //db.burger "burger refers to the model name defined in burger.js"
        db.Burger.findAll({}).then(function(dbBurger) {
            var hbsObject = {
                burgers: dbBurger
            };
            res.render("index", hbsObject);
        });
    });

    // Add a new burger
    app.post("/", function(req, res) {
        db.Burger.create({
            burger_name: req.body.name
        }).then(function() {
            // Refreshes homepage to display the newly added burger
            res.redirect("/");
        });
    });

    // Update devoured state
    app.put("/:id", function(req, res) {
        db.Burger.update(
            { devoured: true }, 
            {
                where: {
                    id: req.params.id
            }
        }).then(function() {
            res.redirect("/");
        });
    });
};


// // Updates data on the server to change the status of a burger
// router.put("/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition: ", condition);
    
//     burger.update({
//         devoured: req.body.devoured
//     }, condition, function() {
//         res.redirect("/");
//     });