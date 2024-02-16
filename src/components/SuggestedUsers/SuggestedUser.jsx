import { Avatar, Flex, Text, VStack, Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const SuggestedUser = ({ name, followers, avatar }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} name={name} size={"md"} />
        <VStack spacing={1} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {name}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {followers} followers
          </Box>
        </VStack>
      </Flex>
      <Button
        fontSize={13}
        bg={"transparent"}
        height={"max-content"}
        p={0}
        fontWeight={"medium"}
        color={"blue.400"}
        _hover={{ color: "white" }}
        cursor={"pointer"}
        onClick={() => {
          setIsFollowing((prev) => !prev);
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
