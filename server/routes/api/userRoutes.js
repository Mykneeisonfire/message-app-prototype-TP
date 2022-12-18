const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../../controllers/userController");

router.route("/signup").post(registerUser);

router.route("/login").post(authUser);

router.route("/search").get(allUsers);

module.exports = router;
