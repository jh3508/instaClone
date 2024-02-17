import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
  const [signOut, isLoggingOut, logOutError] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);

  const showToast = useShowToast();

  const handleLogOut = async () => {
    try {
      await signOut();
      console.log("Logging out");
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogOut, isLoggingOut, logOutError };
};

export default useLogOut;
