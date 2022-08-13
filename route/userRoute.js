var express = require("express");
var router = express.Router();
var controller = require("../controller/userController");

// Get Method
router.get("/users", controller.getAllUsers);
router.get("/users/:id", controller.getUserById);
router.get("/users/email/:email", controller.getUserByEmail);

router.post("/user/register", controller.register);
router.post("/user/login", controller.login);

module.exports = router;
