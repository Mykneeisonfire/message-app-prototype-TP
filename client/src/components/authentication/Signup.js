import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// ==========================================================
// ==========================================================
// Sign Up Form & Functionality
// ==========================================================
// ==========================================================

const Signup = () => {
  // ==========================================================
  // Use State
  // ==========================================================
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const history = useHistory();

  // ==========================================================
  // Toggle for showing & hiding password
  // ==========================================================
  const handleClick = () => setShow(!show);

  // ==========================================================
  // Submit Functionality
  // ==========================================================
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // ==========================================================
    // Specifying Headers
    // ==========================================================
    try {
      const config = {
        Headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/signup",
        { name, email, password },
        config
      );

      toast({
        title: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // ==========================================================
      // Setting user info in local storage
      // ==========================================================
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (err) {
      toast({
        title: "An error has occured",

        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px" color="gray.600">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button h="2rem" mr="5px" fontSize="xs" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button h="2rem" mr="5px" fontSize="xs" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="whatsapp"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up!
      </Button>
    </VStack>
  );
};

export default Signup;
