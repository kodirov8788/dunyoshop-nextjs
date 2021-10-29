import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import MediaFooter from "./MediaFooter";

function Layout({ children }) {
  return (
    <div className="conta">
      <NavBar />
      <Notify />
      <Modal />
      <MediaFooter />

      {children}
    </div>
  );
}

export default Layout;
