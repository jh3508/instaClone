import { Avatar, Flex, Text, VStack, Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, updateSearchUser }) => {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    user.uuid
  );
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    if (isFollowing) {
      updateSearchUser({
        ...user,
        followers: user.followers.filter((uuid) => uuid !== authUser.uuid),
      });
    } else {
      updateSearchUser({
        ...user,
        followers: [...user.followers, authUser.uuid],
      });
    }
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user.profilePicURL} size={"md"} />
        <VStack spacing={1} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user.fullName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uuid !== user.uuid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          height={"max-content"}
          p={0}
          fontWeight={"medium"}
          color={"blue.400"}
          _hover={{ color: "white" }}
          cursor={"pointer"}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
