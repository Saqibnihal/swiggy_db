const express = require("express");
const { GetOrderItems, CreateOrderItems, UpdateOrderItems, DeleteOrderItems } = require("../controller/orderItems");


const { getUser, createUser, updateUser, deleteUser } = require("../controller/user");
const { getAllMenuItems, createmenuItems } = require("../controller/menuItem");
const { getRestaurants, getRestaurantById, createRestaurants, updateRestaurants, deleteRestaurant } = require("../controller/restaurant");

const router = express.Router();

//user table
router.get("/users", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// order Items
router.get("/orderItems", GetOrderItems);
router.post("/orderItems", CreateOrderItems);
router.put("/orderItems/:id", UpdateOrderItems);
router.delete("/orderItems/:id", DeleteOrderItems);
=======

// restaurants
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);
router.post("/restaurants", createRestaurants);
router.patch("/restaurants/:id", updateRestaurants);
router.delete("/restaurants/:id", deleteRestaurant);

// menuItems
router.get('/menuItems', getAllMenuItems);
router.post('/menuItems', createmenuItems);


module.exports = router;
