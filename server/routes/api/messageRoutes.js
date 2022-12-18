const express = require("express");
const router = express.Router();
const { sendMessage, allMessages } = require("../../controllers/messageController");
const { protect } = require("../../middleware/authMiddleware");

// Route for sending message
router.route("/").post(protect, sendMessage);


// Route to receive all messages based on chat ID
router.route("/:chatId").get(protect, allMessages);

module.exports = router;