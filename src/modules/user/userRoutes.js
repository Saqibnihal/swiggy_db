const express = require("express");
const { getUser, createUser, updateUser, deleteUser } = require("./userController");
const router = express.Router();

//user table
router.get("/users", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports=router