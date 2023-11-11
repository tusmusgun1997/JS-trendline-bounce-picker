// Header.js

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { fetchSymbols, setShowResults } from "../redux/symbolsSlice";
import styles from "./Header.module.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSymbols(searchQuery));
    } else {
      dispatch(setShowResults(false)); // Hide results when search query is empty
    }
  }, [dispatch, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    dispatch(setShowResults(true)); // Show results when typing in the search bar
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
