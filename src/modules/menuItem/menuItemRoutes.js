const express = require("express");
const { getAllMenuItems, createmenuItems, updateMenuItem, deleteMenuItem, getMenuWithRestaurants, getMenuWithRestaurantsById } = require("./menuItemController");
const router = express.Router();

// menuItems
router.get('/menuItems', getAllMenuItems);
router.post('/menuItems', createmenuItems);
router.patch('/menuitems/:id', updateMenuItem)
router.delete('/menuitems/:id', deleteMenuItem)
router.get('/menuitems/restaurants', getMenuWithRestaurants)
router.get('/menuitems/restaurants/:id', getMenuWithRestaurantsById)
module.exports = router;