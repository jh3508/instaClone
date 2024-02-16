import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <Flex>
      {/* side bar on the left */}
      {pathname !== "/auth" && (
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
