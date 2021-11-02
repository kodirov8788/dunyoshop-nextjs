import React, { useState, useEffect, useContext } from "react";
import filterSearch from "../utils/filterSearch";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { DataContext } from "../store/GlobalState";

const Filter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const { state, dispatch } = useContext(DataContext);

  const { categories } = state;

  const router = useRouter();

  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div className="filter__filter">
      <div className="filter__categoryContainer">
        <div className="filter__category">
          <select className="" value={category} onChange={handleCategory}>
            <option value="all">All Products</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <BsThreeDots />
        </div>
      </div>

      <form autoComplete="off" className="">
        <input
          type="text"
          placeholder="Enter your search!"
          list="title_product"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={hundleBtn}>
          <FiSearch />
        </button>
      </form>

      {/* <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={sort}
          onChange={handleSort}
        >
          <option value="-createdAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: Hight-Low</option>
          <option value="price">Price: Low-Hight</option>
        </select>
      </div>*/}
    </div>
  );
};

export default Filter;
