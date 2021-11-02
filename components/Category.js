/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import { BsThreeDots } from "react-icons/bs";
import { DataContext } from "../store/GlobalState";

const Category = () => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [categoryId, setCategoryId] = useState("Category");
  // console.log("this is category", categoryId);

  const click = () => {
    filterSearch({ router, category: null });
    setCategoryId("Category");
  };
  return (
    <>
      <div
        className="task__adderSelect"
        onMouseEnter={() => setStatus(true)}
        onMouseLeave={() => setStatus(false)}
      >
        <p> {categoryId} </p>
        <div className={status ? "task__adderStatus" : "hide__status"}>
          <li className="status" onClick={click}>
            <p>All</p>
            {/* <div className="signal"></div> */}

            {categoryId === "Category" || null || "" ? (
              <div className="signal"></div>
            ) : (
              ""
            )}
          </li>

          {categories.map((item) => (
            <div
              href="/"
              className="status"
              onMouseEnter={() => setStatus(true)}
              onMouseLeave={() => setStatus(false)}
              onClick={() =>
                setCategoryId(item.name) +
                filterSearch({ router, category: item._id })
              }
              key={item._id}
              value={item._id}
            >
              <p>{item.name}</p>
              {categoryId === item.name ? <b className="signal"></b> : ""}
            </div>
          ))}
        </div>
        <BsThreeDots />
      </div>
    </>
  );
};

export default Category;
