// SearchResults.jsx

import React from "react";
import styles from "./SearchResults.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowResults } from "../redux/symbolsSlice";
import { useNavigate } from "react-router-dom";
import { fetchStockData, setSymbolSelected } from "../redux/stockDataSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const symbols = useSelector((state) => state.symbols.list);

  const handleClick = async (symbol) => {
    // Dispatch the fetchStockData action to get both daily and weekly data
    dispatch(fetchStockData(symbol));

    // Set the selected symbol in the stockData slice
    dispatch(setSymbolSelected(symbol));

    // Navigate to the combined view
    navigate(`/stock/${symbol}`);

    // Hide the search results
    dispatch(setShowResults(false));
  };

  return (
    <div className={styles.searchResults}>
      <ul>
        {symbols.map((result) => (
          <li key={result} onClick={() => handleClick(result)}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
