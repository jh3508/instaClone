import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => {
          return (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={8}>
              <Flex gap={2} alignItems={"center"}>
                <SkeletonCircle size={10} />
                <Skeleton height={"20px"} w={"200px"} />
              </Flex>
              <Skeleton w={"full"}>
                <Box h={"400px"}>contents</Box>
              </Skeleton>
            </VStack>
          );
        })}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length <= 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"} textAlign={"center"}>
            Doesn't look like you have any friends that have posted
          </Text>
          <Text color={"red.400"} textAlign={"center"}>
            Maybe make some?
          </Text>
          <Text color={"red.400"} textAlign={"center"}>
            (╯°□°）╯︵ ┻━┻
          </Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
