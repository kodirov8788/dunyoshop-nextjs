import { Link } from "react-dom";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
import { DataContext } from "../store/GlobalState";

import { BiCategory } from "react-icons/bi";
const MediaFooter = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = state;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };
  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);
  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <div className="mediafooter">
      <li>
        <BiCategory />
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
      </li>
      <li>
        <a href="#">salom</a>
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
