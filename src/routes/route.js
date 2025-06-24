const express = require("express");
const { GetOrderItems, CreateOrderItems, UpdateOrderItems, DeleteOrderItems } = require("../controller/orderItems");
const { GetOrderStatuses } = require("../controller/orderStatuses");
const router = express.Router();

//user table
router.get("/users",getUser);
router.post("/users",createUser);
router.patch("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);


module.exports = router;
