import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { timeAgo } from "../../utils/timeAgo";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, creator }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    post.createdBy
  );

  return (
    <Flex justify={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {creator ? (
          <Link to={`/${creator.username}`}>
            <Avatar
              src={creator.profilePicURL}
              alignItems={"user profile pic"}
              size={"sm"}
            />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}

        {creator ? (
          <Link to={`/${creator.username}`}>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
              {creator.username}
              <Box color={"gray.500"}>| {timeAgo(post.createdAt)}</Box>
            </Flex>
          </Link>
        ) : (
          <Skeleton w={"full"} height={12} />
        )}
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          fontSize={12}
          isLoading={isUpdating}
          color={"blue.500"}
          bg={"transparent"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
