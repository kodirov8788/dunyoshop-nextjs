import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import MediaFooter from "./MediaFooter";
import MediaNavBar from "./Media/MediaNavBar";
import Link from "next/link";
import LanguageSelect from "../pages/LanguageSelect";

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <MediaNavBar />
      <Notify />
      <Modal />
      <MediaFooter />
      {/* <LanguageSelect /> */}
      {children}
    </div>
  );
}

export default Layout;
