const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

// place a new order
router.post('/', orderController.placeOrder);

// GET /orders/:id - get a specific order by ID
router.get('/:id', orderController.getOrderById);

// GET /orders/user/:userId - get all orders for a specific user
router.get('/user/:userId', orderController.getUserOrders);

// cancel order biscut
router.patch('/:id', orderController.updateOrder)

// history update
router.patch('/:id/update-status', orderController.updateOrderStatusByRestaurant)

// user full history
router.get('/:id/history', orderController.getFullhistoryOfUser)
module.exports = router;
