const express = require("express");
const { getAllMenuItems, createmenuItems, updateMenuItem, deleteMenuItem, getMenuWithRestaurants, getMenuWithRestaurantsById, updateItemAvailability } = require("./menuItemController");
const router = express.Router();

// menuItems
router.get('/:id/restaurants', getMenuWithRestaurantsById)
router.patch('/:id/available', updateItemAvailability)
router.get('/', getAllMenuItems);
router.post('/', createmenuItems);
router.patch('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem)
router.get('/restaurants', getMenuWithRestaurants)
module.exports = router;