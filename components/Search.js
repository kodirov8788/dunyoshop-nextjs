import React, { useContext, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { DataContext } from "../store/GlobalState";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  //   const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    if (search) {
      filterSearch({ router, search: search ? search.toLowerCase() : "all" });
    }
  }, [router, search]);

  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };
  return (
    <form autoComplete="on" className="search__form">
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
  );
};

export default Search;
