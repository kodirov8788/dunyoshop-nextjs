/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import { BiLogInCircle } from "react-icons/bi";
// import Filter from "./Filter";
// import LanguageSelect from "./LanguageSelect";
function MediaNavBar() {
  // const { t, i18n } = useTranslation();
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const email = auth.user?.email.match(/^.+(?=@)/)[0];
  const emailCut =
    email?.length < 10 ? email : email?.substr(0, 11 - 1) + "...";

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // console.log(click);

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="navbar__userlistItem">Users</a>
        </Link>
        <Link href="/create">
          <a className="navbar__userlistItem">Products</a>
        </Link>
        <Link href="/categories">
          <a className="navbar__userlistItem">Categories</a>
        </Link>
      </>
    );
  };

  return (
    <nav
      className={`${
        !show ? "mediaNavbar" : "mediaNavbar navbar__color"
      } navbar-expand-lg`}
    >
      <Link href="/">
        <div className="mediaNavbar__brandContainer">
          <a className="mediaNavbar__brand">DunyoShop</a>
          <div className="mediaNavbar__dot"></div>
        </div>
      </Link>
      <div className="mediaNav__menu">
        <div className="mediaNavbar__cart">
          <Link href="/cart">
            <a className={"mediaNavbar__cartLink" + isActive("/cart")}>
              <BsCartPlus />
              <b>{cart.length}</b>
            </a>
          </Link>
        </div>
        <div className="mediaNav__menuBar">
          <button
            className="mediaNavbar__toggler"
            onClick={() => setClick(!click)}
            type="button"
          >
            <AiOutlineMenu />
          </button>
          <div
            className={
              click
                ? "mediaNav__mediaPlus"
                : "mediaNav__mediaPlus nav__mediaPlusMenu"
            }
          >
            <li onClick={() => setClick(false)}>
              <a href="#">About Us</a>
            </li>
            <li onClick={() => setClick(false)}>
              <a href="#">About Us</a>
            </li>
            <li onClick={() => setClick(false)}>
              <a href="#">About Us</a>
            </li>
            <li onClick={() => setClick(false)}>
              <a href="#">About Us</a>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MediaNavBar;
