import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Creating a context hook to use throughout the app
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const history = useHistory();

  useEffect(() => {
    // Grabbing the user info from local storage that gets set during the login and signup process
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    //if (!userInfo) history.push("/");
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Exporting both the useState and Provider for Chat
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
