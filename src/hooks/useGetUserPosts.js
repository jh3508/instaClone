import React, { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const { userProfile } = useUserProfileStore();

  const showToast = useShowToast();

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "==", userProfile.uuid)
      );
      const querySnapshot = await getDocs(q);

      const posts = [];

      querySnapshot.forEach((post) =>
        posts.push({ ...post.data(), id: post.id })
      );

      setPosts(posts);

      posts.sort((a, b) => {
        b.createdAt - a.createdAt;
      });

      try {
      } catch (error) {
        setPosts([]);
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
