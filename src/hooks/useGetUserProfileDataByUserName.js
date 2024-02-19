import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileDataByUserName = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );

        const querySnap = await getDocs(q);

        if (querySnap.empty) return setUserProfile(null);

        let userDoc;
        querySnap.forEach((user) => {
          userDoc = user.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileDataByUserName;
