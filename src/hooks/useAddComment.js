import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useAddComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addCommentToState = usePostStore((state) => state.addComment);

  const handleCommenting = async (postId, comment) => {
    if (isCommenting) return;
    setIsCommenting(true);
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to comment, sorry",
        "error"
      );

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uuid,
      postId,
    };

    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addCommentToState(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handleCommenting };
};

export default useAddComment;
