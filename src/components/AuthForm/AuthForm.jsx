import {
  Box,
  VStack,
  Image,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            src="/logo.png"
            height={24}
            cursor={"pointer"}
            alt="Instagram"
          />

          {isLogin ? <Login /> : <Signup />}

          {/* ..................OR.................../ */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
        </VStack>
        <GoogleAuth prefix={isLogin ? "Login" : "Sign up"} />
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} w={"full"}>
        <Flex alignItems={"center"} justifyContent={"center"} my={4}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            color={"blue.500"}
            onClick={() => {
              setIsLogin((prev) => !prev);
            }}
            cursor={"pointer"}
          >
            {isLogin ? "Signup" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
