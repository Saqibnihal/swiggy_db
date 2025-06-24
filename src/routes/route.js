const express = require("express");
const { GetOrderItems, CreateOrderItems, UpdateOrderItems, DeleteOrderItems } = require("../controller/orderItems");
const { getUser, createUser, updateUser, deleteUser } = require("../controller/user");
const { getAllMenuItems, createmenuItems, updateMenuItem, deleteMenuItem, getMenuWithRestaurants, getMenuWithRestaurantsById } = require("../controller/menuItem");
const { getRestaurants, getRestaurantById, createRestaurants, updateRestaurants, deleteRestaurant, getRestaurantWithMenu, getRestaurantWithMenuById } = require("../controller/restaurant");
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

// restaurants
router.get('/restaurants/menuItems', getRestaurantWithMenu)
router.get('/restaurants/menuItems/:id', getRestaurantWithMenuById)
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);
router.post("/restaurants", createRestaurants);
router.patch("/restaurants/:id", updateRestaurants);
router.delete("/restaurants/:id", deleteRestaurant);


// menuItems
router.get('/menuItems', getAllMenuItems);
router.post('/menuItems', createmenuItems);
router.patch('/menuitems/:id', updateMenuItem)
router.delete('/menuitems/:id', deleteMenuItem)
router.get('/menuitems/restaurants', getMenuWithRestaurants)
router.get('/menuitems/restaurants/:id', getMenuWithRestaurantsById)
module.exports = router;
