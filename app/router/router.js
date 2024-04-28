const authController = require("../controller/Auth/auth.controller");
 
const router = require("express").Router();


// Register User
router.post("/register",authController.register)
router.post("/login",authController.login)

module.exports = router