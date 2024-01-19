const express = require("express");
const { createUser, loginUser } = require("../controller/authController");
const router = express.Router();
const { authenticationMiddleware } = require("../middleware/authMiddleware");
const { adminBasedMiddleware } = require("../middleware/adminBasedMiddleware");

// route for creating a user
router.post(
  "/register",
  authenticationMiddleware,
  adminBasedMiddleware,
  createUser
);

// route for signing in a user
router.post("/sign-in", loginUser);

module.exports = router;
