import React from "react";
import styles from "./SearchResults.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowResults } from "../redux/symbolsSlice";
import { useNavigate } from "react-router-dom";
import { fetchDailyData } from "../redux/dailyDataSlice";
import { fetchWeeklyData } from "../redux/weeklyDataSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const symbols = useSelector((state) => state.symbols.list);

  const handleClick = (symbol, type) => {
    // Dispatch the appropriate fetch action based on the button clicked
    if (type === "D") {
      dispatch(fetchDailyData(symbol));
      navigate(`/daily/${symbol}`);
    } else if (type === "W") {
      dispatch(fetchWeeklyData(symbol));
      navigate(`/weekly/${symbol}`);
    }

    dispatch(setShowResults(false));
  };

  return (
    <div className={styles.searchResults}>
      <ul>
        {symbols.map((result) => (
          <li key={result}>
            {result}
            <div>
              <button onClick={() => handleClick(result, "D")}>D</button>
              <button onClick={() => handleClick(result, "W")}>W</button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
