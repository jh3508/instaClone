import React from "react";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./Profile";
import CreatePost from "./Create";
import Search from "./Search";

const SideBarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SideBarItems;
