// StockData.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState("D");
  console.log(dailyData, weeklyData)

  useEffect(() => {
    dispatch(setSymbolSelected(urlSymbol));
    dispatch(fetchStockData(urlSymbol));
  }, [urlSymbol, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.stockData}>
      <h1>Stock Name: {selectedSymbol}</h1>
      <div className={styles.dataContainer}>
        <div className={styles.dataSection}>
          <h2>Daily Data</h2>
          {dailyData.length > 0 && (
            <div>
              <p>Latest Close: {dailyData[0].close}</p>
              <p>Latest Open: {dailyData[0].open}</p>
              <p>Latest Low: {dailyData[0].low}</p>
              <p>Latest High: {dailyData[0].high}</p>
            </div>
          )}
        </div>
        <div className={styles.dataSection}>
          <h2>Weekly Data</h2>
          {weeklyData.length > 0 && (
            <div>
              <p>Latest Close: {weeklyData[0].close}</p>
              <p>Latest Open: {weeklyData[0].open}</p>
              <p>Latest Low: {weeklyData[0].low}</p>
              <p>Latest High: {weeklyData[0].high}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.tabButtons}>
        <button onClick={() => handleTabClick("D")}>D</button>
        <button onClick={() => handleTabClick("W")}>W</button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "D" ? (
          <DailyData data={dailyData} />
        ) : (
          <WeeklyData data={weeklyData} />
        )}
      </div>
    </div>
  );
};

export default StockData;
