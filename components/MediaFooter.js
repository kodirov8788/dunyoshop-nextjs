/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
import { DataContext } from "../store/GlobalState";
import { FiSearch, FiSmartphone } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogInCircle, BiCategory } from "react-icons/bi";
import Cookie from "js-cookie";

const MediaFooter = () => {
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [userClick, setUserClick] = useState(false);
  const [categoryId, setCategoryId] = useState("Category");
  const email = auth.user?.email.match(/^.+(?=@)/)[0];
  const emailCut =
    email?.length < 10 ? email : email?.substr(0, 11 - 1) + "...";
  // console.log("this is category", categoryId);
  // console.log("this is userClick", userClick);
  const click = () => {
    filterSearch({ router, category: null });
    setCategoryId("Category");
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };

  // -----------------
  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };
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
          <a className="mediaFooter__userlistItem">Users</a>
        </Link>
        <Link href="/create">
          <a className="mediaFooter__userlistItem">Products</a>
        </Link>
        <Link href="/categories">
          <a className="mediaFooter__userlistItem">Categories</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <div>
        <div className="madiaFooter__userToggle">
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              // transform: "translateY(-3px)",
              marginRight: "3px",
            }}
          />
          <p className="mediaFooter__userName">{emailCut}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="mediafooter">
      <li
        className="mediaTask__adderSelect"
        onClick={() =>
          setStatus(!status) + setSearchClick(false) + setUserClick(false)
        }
      >
        <BiCategory />
        {/* <p> {categoryId} </p> */}
        <div
          className={status ? "mediaTask__adderStatus" : "mediaHide__status"}
        >
          <div className="mediaFooter__status" onClick={click}>
            <p>All</p>

            {categoryId === "Category" || null || "" ? (
              <div className="signal"></div>
            ) : (
              ""
            )}
          </div>

          {categories.map((item) => (
            <div
              href="/"
              className="mediaFooter__status"
              onClick={() =>
                setCategoryId(item.name) +
                filterSearch({ router, category: item._id }) +
                setStatus(false)
              }
              key={item._id}
              value={item._id}
            >
              <p>{item.name}</p>
              {categoryId === item.name ? <b className="signal"></b> : ""}
            </div>
          ))}
        </div>
      </li>
      <div
        className={
          searchClick
            ? "media__footerSearchContainer"
            : "media__footerSearchContainer media__footerSearchContainerFalse"
        }
      >
        <input
          type="text"
          list="title_product"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={hundleBtn}>
          <FiSearch />
        </button>
      </div>
      <li
        className="media__footerSearch"
        onClick={() =>
          setSearchClick(!searchClick) + setStatus(false) + setUserClick(false)
        }
      >
        <FiSearch />
      </li>
      <div
        className={`${
          userClick
            ? `${
                auth.user?.role === "admin"
                  ? "MediaFooter__customListAdmin"
                  : "MediaFooter__customList"
              }`
            : `${
                auth.user?.role === "admin"
                  ? "MediaFooter__customListAdmin MediaFooter__customListAdmin__non"
                  : "MediaFooter__customList MediaFooter__customList__non"
              }`
        }`}
      >
        <Link href="/profile">
          <a className="mediaFooter__userlistItem">Profile</a>
        </Link>
        {auth.user?.role === "admin" && adminRouter()}
        <span className="mediaFooter__userlistItem" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <li
        className="media__footerUser"
        onClick={() =>
          setUserClick(!userClick) + setSearchClick(false) + setStatus(false)
        }
      >
        <div className="navbar__nav">
          {Object.keys(auth).length === 0 ? (
            <li className="nav__listItem">
              <Link href="/signin">
                <a className={"nav__link" + isActive("/signin")}>
                  <BiLogInCircle />
                  {/* <p>Sign In</p> */}
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </div>
      </li>
      <li
        onClick={() =>
          setUserClick(false) + setSearchClick(false) + setStatus(false)
        }
      >
        <a href="#" className="mediaFooter__contact">
          <FiSmartphone />
          {/* <p>Contact</p> */}
        </a>
      </li>
    </div>
  );
};

export default MediaFooter;
