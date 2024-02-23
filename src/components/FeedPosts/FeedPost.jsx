import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const FeedPost = ({ post }) => {
  return (
    <>
      {/* <PostHeader post={post} /> */}
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt="feed post image"></Image>
      </Box>
      {/* <PostFooter /> */}
    </>
  );
};

export default FeedPost;
