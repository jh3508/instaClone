import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);
  const canRenderSideBar = pathname !== "/auth" && user;
  return (
    <Flex>
      {/* side bar on the left */}
      {canRenderSideBar && (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      )}
      {/* content on the right */}
      <Box flex={1} w={{ base: "calc(100% - 70px", md: "calc(100% - 240px" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
