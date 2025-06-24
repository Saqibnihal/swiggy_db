const express = require("express");
const { getRestaurantWithMenu, getRestaurantWithMenuById, getRestaurantById, getRestaurants, updateRestaurants, createRestaurants, deleteRestaurant } = require("./restaurantController");
const router = express.Router();


// restaurants
router.get('/restaurants/menuItems', getRestaurantWithMenu)
router.get('/restaurants/menuItems/:id', getRestaurantWithMenuById)
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);
router.post("/restaurants", createRestaurants);
router.patch("/restaurants/:id", updateRestaurants);
router.delete("/restaurants/:id", deleteRestaurant);

module.exports=router