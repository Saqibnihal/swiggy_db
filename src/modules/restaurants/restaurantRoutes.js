const express = require("express");
const { getRestaurantWithMenu, getRestaurantWithMenuById, getRestaurantById, getRestaurants, updateRestaurants, createRestaurants, deleteRestaurant, getOpenRestaurants } = require("./restaurantController");
const router = express.Router();


// restaurants
// router.get('/menuItems', getRestaurantWithMenu)
// router.get('/menuItems/:id', getRestaurantWithMenuById)

router.post("/", createRestaurants);
router.get("/", getRestaurants);
router.get("/open", getOpenRestaurants);
router.get("/:id", getRestaurantById);
router.patch("/:id", updateRestaurants);
router.delete("/:id", deleteRestaurant);

module.exports = router