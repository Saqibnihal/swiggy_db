const express = require("express");
const { getOrderItems, createOrderItem, updateOrderItem, deleteOrderItem } = require("./orderController");
const router = express.Router();


// order 
router.get("/orders", getOrderItems);
router.post("/orders", createOrderItem);
router.put("/orders/:id", updateOrderItem);
router.delete("/orders/:id", deleteOrderItem);

module.exports=router