import React from "react";
import SuggestedUsersHeader from "./SuggestedUsersHeader";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import useAuthStore from "../../store/authStore";

const SuggestedUsers = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <VStack py={8} px={6} gap={4}>
      {authUser && <SuggestedUsersHeader />}
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
      <SuggestedUser
        name="Influencer 1"
        followers={23214}
        avatar="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg"
      />
      <SuggestedUser
        name="Influencer 2"
        followers={19823}
        avatar="https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg"
      />
      <SuggestedUser
        name="Influencer 3"
        followers={8314}
        avatar="https://images.pexels.com/photos/7752438/pexels-photo-7752438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Box alignSelf={"start"} fontSize={12} color={"gray.500"} mt={5}>
        © Built by Jakir Hossain in 2024
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
