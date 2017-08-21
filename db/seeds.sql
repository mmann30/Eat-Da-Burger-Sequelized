-- Initial seed data for Eat-Da-Burger
USE burgers_db;

INSERT INTO burgers(burger_name, createdAt, updatedAt)
VALUES
    ("Jalapeno Cheese Burger", now(), now()),
    ("Quadrupal Bacon Burger", now(), now()),
    ("Apple Goat Cheese Black Bean Burger", now(), now());
