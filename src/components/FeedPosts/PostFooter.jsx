import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useAddComment from "../../hooks/useAddComment";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const PostFooter = ({ username, isProfilePage, post }) => {
  const [likes, setLikes] = useState(1000);
  const [isLiked, setIsLiked] = useState(false);

  const authUser = useAuthStore((state) => state.user);

  const showToast = useShowToast();
  const [comment, setComment] = useState("");
  const { handleCommenting, isCommenting } = useAddComment();

  const handleSubmitComment = async () => {
    if (comment.trim().length <= 0)
      return showToast("Error", "Please do not post empty comments", "error");
    await handleCommenting(post.id, comment);
    setComment("");
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setIsLiked((prev) => !prev);
  };
  return (
    <Box mb={8} mt={"auto"}>
      <Flex align={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {username}
            <Text as={"span"} fontWeight={400}>
              Feeling good
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"}>
            View all 1,000 comments
          </Text>
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
