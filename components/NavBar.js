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
import { useTranslation } from "react-i18next";

import filterSearch from "../utils/filterSearch";
import { BiLogInCircle } from "react-icons/bi";
// import LanguageSelect from "./LanguageSelect";
function NavBar() {
  // const { t, i18n } = useTranslation();
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");
  // console.log(click);
  // -----------------------------------------------------------------------
  const [category, setCategory] = useState("");

  const { categories } = state;
  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  // const handleSort = (e) => {
  //   setSort(e.target.value);
  //   filterSearch({ router, sort: e.target.value });
  // };
  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);
  // -----------------------------------------------------------------------

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };
  // ---------- Nav Position  -------------------------------------------------------------

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  // -----------------------------------------------------------------------

  // ------ Nav Category -----------------------------------------------------------------
  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };
  // -----------------------------------------------------------------------

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
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Products</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              transform: "translateY(-3px)",
              marginRight: "3px",
            }}
          />
          <div className="">{auth.user.name}</div>
        </a>

        <div className="dropdown-menu">
          <Link href="/profile">
            <a className="dropdown-item">Profile</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
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
      {/* <LanguageSelect /> */}
      {show && (
        <div className="nav__category">
          <div>
            <select
              className="text-capitalize"
              value={category}
              onChange={handleCategory}
            >
              <option value="all">All Products</option>

              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <BsThreeDots />
          </div>
          <form autoComplete="on">
            <input
              type="text"
              list="title_product"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={hundleBtn}>
              <FiSearch />
            </button>
          </form>
        </div>
      )}
      <a href="tel:+998939427899" className="nav__phone">
        <h4 className="ml-5">Aloqa Uchun: (93) 942-78-99</h4>
        {/* <h5>{t("Contact__Number")}</h5> */}
      </a>

      <div className="nav__menu">
        <div className="navbar__cart">
          <Link href="/cart">
            <a className={"navbar__cartLink" + isActive("/cart")}>
              <BsCartPlus />
              <b>{cart.length}</b>
            </a>
          </Link>
        </div>
        <button
          className="navbar__toggler"
          onClick={() => setClick(!click)}
          type="button"
        >
          <AiOutlineMenu />
        </button>
        <ul className="navbar__nav">
          {Object.keys(auth).length === 0 ? (
            <li className="nav__listItem">
              <Link href="/signin">
                <a className={"nav__link" + isActive("/signin")}>
                  {/* <i className="fas fa-user" aria-hidden="true"></i>  */}
                  <BiLogInCircle /> Sign in
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
      <div className={click ? "nav__mediaMenuPlus" : "nav__mediaMenu"}>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
      </div>
    </nav>
  );
}

export default NavBar;
