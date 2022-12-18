const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const User = require("../models/User");

// ==========================================================
// ==========================================================
// Chat Access Functionality
// ==========================================================
// ==========================================================
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User ID not found");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    $and: [
      {
        users: { $elementMatch: { $eq: req.user._id } },
      },
      {
        users: { $elementMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  // If the chat exists, the router will send the chat
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // Otherwise, a new chat between two users is created
    let chatData = {
      chatName: "sender",
      users: [req.user._id],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const newChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(newChat);
    } catch (err) {
      res.status(400);
      res.sendStatus;
    }
  }
});

// ==========================================================
// ==========================================================
// Get All Chats Functionality
// ==========================================================
// ==========================================================
const allChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elementMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.user",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    res.sendStatus;
  }
});

module.exports = {
  accessChat,
  allChats,
};
