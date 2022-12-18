const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

// ==========================================================
// ==========================================================
// Send Message Functionality
// ==========================================================
// ==========================================================
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content) {
    console.log("Invalid data");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    res.statusMessage;
    res.send();
  }
});

// ==========================================================
// ==========================================================
// All Messages Functionality
// ==========================================================
// ==========================================================
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name, email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    res.statusMessage;
    res.send();
  }
});

module.exports = { sendMessage, allMessages };
