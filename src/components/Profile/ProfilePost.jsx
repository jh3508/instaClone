import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={img}
          objectFit={"cover"}
          height={"100%"}
          width={"100%"}
          objectPosition={"center"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }}>
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={img} />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ sm: "none", md: "flex" }}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Avatar src="/profilepic.png" size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={"12"}>
                      asaprogramer_
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ color: "red.600", bg: "whiteAlpha.300" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt="1d ago"
                    username="algovsT"
                    profilePic="https://images.pexels.com/photos/7752685/pexels-photo-7752685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="planthe"
                    profilePic="https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />{" "}
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="sandz"
                    profilePic="https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw"
                    text="dummy image from api"
                  />
                </VStack>
                <Divider my={4} color={"gray.800"} />
                <PostFooter isProfilePage />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
