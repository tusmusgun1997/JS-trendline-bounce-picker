// StockData.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DailyData from "./DailyData";
import WeeklyData from "./WeeklyData";
import { fetchStockData, setSymbolSelected } from "../redux/stockDataSlice";
import styles from "./StockData.module.css";

const StockData = () => {
  const { symbol: urlSymbol } = useParams();
  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state) => state.stockData.symbolSelected);
  const dailyData = useSelector((state) => state.stockData.dailyData);
  const weeklyData = useSelector((state) => state.stockData.weeklyData);
  const dailyHighTrendlineData = useSelector((state) => state.stockData.dailyHighTrendlineData);
  const dailyLowTrendlineData = useSelector((state) => state.stockData.dailyLowTrendlineData);
  const weeklyHighTrendlineData = useSelector((state) => state.stockData.weeklyHighTrendlineData);
  const weeklyLowTrendlineData = useSelector((state) => state.stockData.weeklyLowTrendlineData);
  const [activeTab, setActiveTab] = useState("D");

  useEffect(() => {
    dispatch(setSymbolSelected(urlSymbol));
    dispatch(fetchStockData(urlSymbol));
  }, [urlSymbol, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.stockData}>
      <h1>{selectedSymbol}</h1>

      {activeTab === "W" && (
        <div className={styles.scrollableContainer}>
          <div className={styles.trendlineSection}>
            {weeklyLowTrendlineData.map((trendlineData) => (
              <div className={`${styles.trendlineBox} ${styles.lowTrendline}`} key={trendlineData._id}>
                <p><b>Start:</b> {trendlineData.start}</p>
                <p><b>Continuation:</b> {trendlineData.continuation}</p>
                <p><b>End Intercept:</b> {Math.floor(trendlineData.end_intercept)}</p>
              </div>
            ))}
            {weeklyHighTrendlineData.map((trendlineData) => (
              <div className={`${styles.trendlineBox} ${styles.highTrendline}`} key={trendlineData._id}>
                <p><b>Start:</b> {trendlineData.start}</p>
                <p><b>Continuation:</b> {trendlineData.continuation}</p>
                <p><b>End Intercept:</b> {Math.floor(trendlineData.end_intercept)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "D" && (
        <div className={styles.scrollableContainer}>
          <div className={styles.trendlineSection}>
            {dailyLowTrendlineData.map((trendlineData) => (
              <div className={`${styles.trendlineBox} ${styles.lowTrendline}`} key={trendlineData._id}>
                <p><b>Start:</b> {trendlineData.start}</p>
                <p><b>Continuation:</b> {trendlineData.continuation}</p>
                <p><b>End Intercept:</b> {Math.floor(trendlineData.end_intercept)}</p>
              </div>
            ))}
            {dailyHighTrendlineData.map((trendlineData) => (
              <div className={`${styles.trendlineBox} ${styles.highTrendline}`} key={trendlineData._id}>
                <p><b>Start:</b> {trendlineData.start}</p>
                <p><b>Continuation:</b> {trendlineData.continuation}</p>
                <p><b>End Intercept:</b> {Math.floor(trendlineData.end_intercept)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.tabButtons}>
        <button onClick={() => handleTabClick("D")}><b>D</b></button>
        <button onClick={() => handleTabClick("W")}><b>W</b></button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "D" ? (
          <DailyData
            data={dailyData}
            dailyHighTrendlineData={dailyHighTrendlineData}
            dailyLowTrendlineData={dailyLowTrendlineData}
          />
        ) : (
          <WeeklyData
            weeklyData={weeklyData}
            weeklyHighTrendlineData={weeklyHighTrendlineData}
            weeklyLowTrendlineData={weeklyLowTrendlineData}
          />
        )}
      </div>
    </div>
  );
};

export default StockData;
