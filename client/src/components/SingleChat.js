import {
  Box,
  FormControl,
  Input,
  Text,
  useToast,
  Button
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import axios from "axios";
import "./style.css";
import io from "socket.io-client";


const ENDPOINT = "http://localhost:3001";
var socket;

function SingleChat() {
  // ==========================================================
  // Use State Setup
  // ==========================================================
  const [messages, setMessages] = useState([]);
 // const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
 // const [isTyping, setIsTyping] = useState(false);


 const [value, setValue] = useState("");
 const inputReset = React.useRef(null);
 const [msg, setMsg] = useState([]);

 const submitValue = () => {
  const msgItem = {
    msg: value
  }
  setMsg((prevMsg) => [...prevMsg, msgItem]);
  inputReset.current.value = "";
 };


  const { user, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

  // ==========================================================
  // Initializing Socket.io
  // ==========================================================
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("success", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("chat message", (data) => setNewMessage([...messages]));
  }, [user, messages]);


  // ==========================================================
  // ==========================================================
  // Send Message Functionality
  // ==========================================================
  // ==========================================================
  const sendMessage = async (event) => {
    if (event.key === "Enter" && submitValue) {
      try {
        const config = {
          Headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/messages",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // Socket for sending a new message
        socket.emit("chat message", function() {
          
        });
        setMessages([data]);
        return newMessage(data);
        // ==========================================================
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Unable to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  // ==========================================================
  // Output
  // ==========================================================

  return (
    <>
      {" "}
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work Sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="75%"
            borderRadius="lg"
            overflowY="hidden"
          >
              <Box className="messages" h="80%" w="100%" flexDirection="row">
              <div>
                {msg.map(({msg}) => (
                    <p>{msg}</p>
                ))}
              </div>
              </Box>

            <FormControl onKeyDown={submitValue} isRequired mt={3}>

              <Input
                ref={inputReset}
                variant="filled"
                bg="#E0E0E0"
                placeholder="Say something!"
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>
          </Box>
        </>
      )
      }

export default SingleChat;
