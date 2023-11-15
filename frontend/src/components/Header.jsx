// Header.js

import React, { useState, useEffect } from "react";
import { FaSearch, FaHome } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchSymbols, setShowResults } from "../redux/symbolsSlice";
import styles from "./Header.module.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

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

  const navigateToHome = () => {
    navigate('/'); // Redirect to the base URL
  };

  return (
      <div className={styles.container}>
        <div className={styles.logoContainer} onClick={navigateToHome}>
          <FaHome className={styles.homeIcon} />
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </div>
  );
};

export default Header;
