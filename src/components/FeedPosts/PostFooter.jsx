import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useAddComment from "../../hooks/useAddComment";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentModal";

const PostFooter = ({ username, isProfilePage, post, creator }) => {
  const commentRef = useRef(null);

  const authUser = useAuthStore((state) => state.user);

  const showToast = useShowToast();
  const [comment, setComment] = useState("");
  const { handleCommenting, isCommenting } = useAddComment();

  const { likes, isLiked, handleLikePost, isUpdating } = useLikePost(post);

  const handleSubmitComment = async () => {
    if (comment.trim().length <= 0)
      return showToast("Error", "Please do not post empty comments", "error");
    await handleCommenting(post.id, comment);
    setComment("");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mb={8} mt={"auto"}>
      <Flex align={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => {
            console.log("wadawd");
            commentRef.current.focus();
          }}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {isProfilePage && (
        <Text fontSize={12} color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creator?.username}{" "}
            <Text as={"span"} fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize={"sm"}
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {/* Comments modal will only open on homepage */}
          {isOpen && (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          )}
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
              ref={commentRef}
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
