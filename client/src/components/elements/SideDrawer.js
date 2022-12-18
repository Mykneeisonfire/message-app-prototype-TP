import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Stack,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { EmailIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/chatProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import UserListItem from "../Users/UserListItem";

// ==========================================================
// ==========================================================
// Side Drawer Functionality
// ==========================================================
// ==========================================================

const SideDrawer = () => {
  // ==========================================================
  // Use State Setup
  // ==========================================================
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // ==========================================================
  // Logout
  // ==========================================================
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();

  // ==========================================================
  // Search Users
  // ==========================================================
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter a name or email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        Headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult([data]);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // ==========================================================
  // Chat Access
  // ==========================================================
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        Headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._d))
        setSelectedChat([data, ...chats]);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Unable to fetch chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // ==========================================================
  // Output
  // ==========================================================

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Stack direction="row" spacing="35%">
          <Tooltip label="Search for users" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen}>
              <i className="fa fa-search" aria-hidden="true"></i>
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search Users
              </Text>
            </Button>
          </Tooltip>

          <Text fontSize="3xl" fontFamily="Work Sans" color="gray.600">
            MyloChat
          </Text>

          <div>
            <Menu>
              <MenuButton p={1}>
                <EmailIcon fontSize="2xl" m={1} />
              </MenuButton>
            </Menu>
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </Stack>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                width="80%"
                marginRight="5%"
                placeholder="Search for name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <Button size="sm" p={0} m={0} onClick={handleSearch}>
                <Search2Icon fontSize="md" />
              </Button>
            </Box>
            {loading ? (
              <Loading />
            ) : (
              searchResult?.map((user, id) => (
                <UserListItem
                  key={id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
