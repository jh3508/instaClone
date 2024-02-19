import React from "react";
import SuggestedUsersHeader from "./SuggestedUsersHeader";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import useAuthStore from "../../store/authStore";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const authUser = useAuthStore((state) => state.user);

  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      {authUser && <SuggestedUsersHeader />}
      {suggestedUsers.length > 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See all
          </Text>
        </Flex>
      )}
      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}
      <Box alignSelf={"start"} fontSize={12} color={"gray.500"} mt={5}>
        © Built by Jakir Hossain in 2024
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
