import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";

const SuggestedUsersHeader = () => {
  const { handleLogOut, isLoggingOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilePicURL} />
        </Link>
        <Link to={`/${authUser.username}`}>
          <Box fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Box>
        </Link>
      </Flex>
      <Button
        onClick={handleLogOut}
        isLoading={isLoggingOut}
        size={"xs"}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        p={0}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedUsersHeader;
