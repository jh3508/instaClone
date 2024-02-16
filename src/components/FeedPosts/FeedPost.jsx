import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const FeedPost = ({ img, avatar, username }) => {
  return (
    <>
      <PostHeader avatar={avatar} username={username} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt="user profile pic"></Image>
      </Box>
      <PostFooter />
    </>
  );
};

export default FeedPost;
