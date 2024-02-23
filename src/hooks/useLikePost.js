import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { array } from "i/lib/util";

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uuid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    console.log("tirg");
    setIsUpdating(true);
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to like a post!",
        "error"
      );

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uuid) : arrayUnion(authUser.uuid),
      });

      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };
  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
