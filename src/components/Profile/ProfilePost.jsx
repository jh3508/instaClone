import {
  Avatar,
  Box,
  Button,
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
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile, deletePost: deleteFromUserState } =
    useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deletePost } = usePostStore();

  const handlePostDeletion = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uuid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      deletePost(post.id);
      deleteFromUserState(post.id);
      showToast("Success", "Post was deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

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
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
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
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              alignItems={"center"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={post.imageURL} />
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
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Avatar src={userProfile?.profilePicURL} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={"12"}>
                      {userProfile?.username}
                    </Text>
                  </Flex>
                  {authUser?.uuid == userProfile?.uuid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ color: "red.600", bg: "whiteAlpha.300" }}
                      borderRadius={4}
                      p={1}
                      onClick={handlePostDeletion}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Text fontSize={12} mt={2}>
                  {post.caption}
                </Text>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* CAPTIONS
                  {post.caption && <Caption post={post} />} */}
                  {/* COMMENTS BELOW  */}
                  {post.comments.map((comment, i) => (
                    <Comment key={i} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} color={"gray.800"} />
                <PostFooter isProfilePage post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
