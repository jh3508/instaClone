import { Avatar, Box, Flex, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedUsersHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar name="asaprogrammer" size={"lg"} src="/profilepic.png" />
        <Box fontSize={12} fontWeight={"bold"}>
          asaprogrammer
        </Box>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        style={{ textDecoration: "none" }}
      >
        Log out
      </Link>
    </Flex>
  );
};

export default SuggestedUsersHeader;
