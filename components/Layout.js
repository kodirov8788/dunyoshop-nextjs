import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import MediaFooter from "./MediaFooter";
import MediaNavBar from "./Media/MediaNavBar";
import Link from "next/link";
import Youtube from "../pages/Youtube";

function Layout({ children }) {
  return (
    <div className="conta">
      <NavBar />
      <MediaNavBar />
      <Notify />
      <Modal />
      <MediaFooter />
      <Link href="/youtube">
        <a>
          <Youtube />
        </a>
      </Link>
      {children}
    </div>
  );
}

export default Layout;
