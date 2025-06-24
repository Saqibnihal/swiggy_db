const express = require("express");
const { getUser, deleteUser, updateUser, createUser } = require("../controller/user");
const router = express.Router();

router.get("/users",getUser);
router.post("/users",createUser);
router.patch("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);

module.exports = router;
