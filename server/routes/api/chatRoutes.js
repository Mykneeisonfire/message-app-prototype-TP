const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
const {
  accessChat,
  allChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../../controllers/chatController");

// Route for accessing and creating a chat
router.route("/").post(protect, accessChat).get(protect, allChats);

// Route for group chats
router.route("/group").post(protect, createGroupChat);

// Route for editing group chats / adding and removing users
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
