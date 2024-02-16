import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";

const FeedPosts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {loading &&
        [0, 1, 2, 3].map((_, idx) => {
          return (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={8}>
              <Flex gap={2} alignItems={"center"}>
                <SkeletonCircle size={10} />
                <Skeleton height={"20px"} w={"200px"} />
              </Flex>
              <Skeleton w={"full"}>
                <Box h={"500px"}>contents</Box>
              </Skeleton>
            </VStack>
          );
        })}
      {!loading && (
        <>
          <FeedPost username="JaneDoe" img={"/img1.png"} avatar="/img1.png" />
          <FeedPost username="Wilburt" img={"/img2.png"} avatar="/img2.png" />
          <FeedPost username="Haylen" img={"/img3.png"} avatar="/img3.png" />
          <FeedPost username="JakJak" img={"/img4.png"} avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
