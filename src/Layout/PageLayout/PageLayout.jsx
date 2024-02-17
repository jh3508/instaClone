import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/NavBar/NavBar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, logInLoading] = useAuthState(auth);
  const canRenderSideBar = pathname !== "/auth" && user;
  const canRenderLoginNav = !user && !logInLoading && pathname !== "/auth";

  const userIsAuthenticating = !user && logInLoading;

  if (userIsAuthenticating) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderLoginNav ? "column" : "row"} className="PAGELAYOUT">
      {/* side bar on the left */}
      {canRenderSideBar && (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      )}
      {/* navbar on top  */}
      {canRenderLoginNav && <Navbar />}

      {/* content on the right */}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px", md: "calc(100% - 240px" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default PageLayout;
