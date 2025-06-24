const express = require("express");
const { GetOrderItems, CreateOrderItems, UpdateOrderItems, DeleteOrderItems } = require("../controller/orderItems");
const { GetOrderStatuses } = require("../controller/orderStatuses");
const router = express.Router();

// praveen
router.get("/orderItems", GetOrderItems);
router.post("/orderItems", CreateOrderItems);
router.put("/orderItems/:id", UpdateOrderItems);
router.delete("/orderItems/:id", DeleteOrderItems);

router.get("/orderstatus", GetOrderStatuses);
router.post("/orderstatus", GetOrderStatuses);
router.put("/orderstatus/:id", GetOrderStatuses);
router.delete("/orderstatus/:id", GetOrderStatuses);


module.exports = router;
