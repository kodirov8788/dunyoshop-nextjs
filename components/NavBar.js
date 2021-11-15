/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { BsCartPlus, BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import filterSearch from "../utils/filterSearch";
import { BiLogInCircle } from "react-icons/bi";
import Category from "./Category";
import Search from "./Search";
import Filter from "./Filter";
import en from "../locales/en";
import uz from "../locales/uz";
import LanguageSelect from "../pages/LanguageSelect";
function NavBar() {
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [show, setShow] = useState(false);
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

  const loggedRouter = () => {
    return (
      <div
        onMouseEnter={() => setUserOpen(true)}
        onMouseLeave={() => setUserOpen(false)}
      >
        <div className="navbart__userToggle">
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              // transform: "translateY(-3px)",
              // marginRight: "3px",
            }}
          />
          <p className="navbar__userName">{emailCut}</p>
        </div>

        <div
          className={`${
            userOpen
              ? "navbar__customList"
              : "navbar__customList navbar__customList__non"
          }`}
        >
          <Link href="/profile">
            <a className="navbar__userlistItem">Profile</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <span className="navbar__userlistItem" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    );
  };

  const { locale } = router;
  const t = locale === "en" ? en : uz;
  // console.log(language);
  return (
    <>
      <nav
        className={`${
          !show ? "navbar" : "navbar navbar__color"
        } navbar-expand-lg`}
      >
        <Link href="/">
          <div className="navbar__brandContainer">
            <a className="navbar__brand">DunyoShop</a>
            <div className="navbar__dot"></div>
          </div>
        </Link>

        <div className="navbar__filter">
          <Category />
          <Search />
        </div>

        <div className="nav__menu">
          <div className="navbar__cart">
            <Link href="/cart">
              <a className={"navbar__cartLink" + isActive("/cart")}>
                <BsCartPlus />
                <b>{cart.length}</b>
              </a>
            </Link>
          </div>

          <div className="navbar__nav">
            {Object.keys(auth).length === 0 ? (
              <li className="nav__listItem">
                <Link href="/signin">
                  <a className={"nav__link" + isActive("/signin")}>
                    <BiLogInCircle /> {t.Sign__in}
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </div>
          <a href="tel:+998939427899" className="nav__phone">
            <h4>(93) 942-78-99</h4>
            {/* <h1>{t.description}</h1> */}
            {/* <h5>{t("Contact__Number")}</h5> */}
          </a>
        </div>
      </nav>
      <LanguageSelect />
    </>
  );
}

export default NavBar;
