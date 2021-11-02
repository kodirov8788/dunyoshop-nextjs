import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
import { DataContext } from "../store/GlobalState";
import { FiSearch } from "react-icons/fi";

import { BiCategory } from "react-icons/bi";
const MediaFooter = () => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [categoryId, setCategoryId] = useState("Category");
  // console.log("this is category", categoryId);
  console.log("this is search", searchClick);
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
  return (
    <div className="mediafooter">
      <li className="mediaTask__adderSelect" onClick={() => setStatus(!status)}>
        <BiCategory />
        {/* <p> {categoryId} </p> */}
        <div
          className={status ? "mediaTask__adderStatus" : "mediaHide__status"}
        >
          <div className="mediaFooter__status" onClick={click}>
            <p>All</p>
            {/* <div className="signal"></div> */}

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
        onClick={() => setSearchClick(!searchClick)}
      >
        <FiSearch />
      </li>
      <li>
        <a href="#">salom</a>
      </li>
      <li>
        <a href="#">salom</a>
      </li>
    </div>
  );
};

export default MediaFooter;
