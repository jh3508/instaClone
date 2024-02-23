import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Comment = ({ comment }) => {
  return (
    <Flex gap={4}>
      {/* <Avatar src={profilePic} size={"sm"} name={username} /> */}
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {/* {username} */}
          </Text>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text color={"gray"} fontSize={12}>
          {/* {createdAt} */}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
