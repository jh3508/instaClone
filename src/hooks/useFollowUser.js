import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { user, setUser } = useAuthStore();

  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", user.uuid);
      const userToFollowOrUnFollowRed = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnFollowRed, {
        followers: isFollowing ? arrayRemove(user.uuid) : arrayUnion(user.uuid),
      });

      if (isFollowing) {
        setUser({
          ...user,
          following: user.following.filter((uuid) => uuid !== userId),
        });

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uuid) => uuid !== userId),
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...user,
            following: user.following.filter((uuid) => uuid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        const newFollowingList = [...user.following, userId];
        setUser({ ...user, following: newFollowingList });

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, userId],
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...user, following: newFollowingList })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  return { isFollowing, handleFollowUser, isUpdating };
};

export default useFollowUser;
