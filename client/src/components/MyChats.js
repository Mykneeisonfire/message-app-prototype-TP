import { Box, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import Loading from "./Loading";

// ==========================================================
// Load chats and the users in them
// ==========================================================
const MyChats = ({ _id }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  // ==========================================================
  // Load all chats
  // ==========================================================
  const allChats = async () => {
    try {
      const config = {
        Headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(loggedUser);
    allChats();
    // eslint-disable-next-line
  }, []);

  // ==========================================================
  // Output
  // ==========================================================

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      h="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "30px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        h="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        key={_id}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {[...chats].map((_id) => (
              <Box
                onClick={() => setSelectedChat(_id)}
                cursor="pointer"
                bg={selectedChat === _id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === _id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                value={_id}
              >
              </Box>
            ))}
          </Stack>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
