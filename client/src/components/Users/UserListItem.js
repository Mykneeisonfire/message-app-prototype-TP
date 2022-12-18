import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/chatProvider";

function UserListItem({ handleFunction }) {
  const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      d="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserListItem;
