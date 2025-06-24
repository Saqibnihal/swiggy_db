const express = require("express");
const { GetOrderItems, CreateOrderItems, UpdateOrderItems, DeleteOrderItems } = require("../controller/orderItems");
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

module.exports = router;
