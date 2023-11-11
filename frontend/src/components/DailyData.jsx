// DailyData.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { useParams } from "react-router-dom";
import { fetchDailyData } from "../redux/dailyDataSlice";

const DailyData = () => {
  const { symbol: urlSymbol } = useParams();
  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dailyData.data);

  useEffect(() => {
    // Trigger fetchDailyData only if the symbol from the URL is different from the current symbol
    if (urlSymbol && urlSymbol !== dailyData?.symbol) {
      dispatch(fetchDailyData(urlSymbol));
    }
  }, [urlSymbol, dailyData?.symbol, dispatch]);

  useEffect(() => {
    if (dailyData && dailyData.length > 0) {
      const cleanedData = removeDuplicateDates(dailyData[0].data);
      renderChart(dailyData[0].symbol, cleanedData);
    }
  }, [dailyData]);

  const removeDuplicateDates = (data) => {
    const uniqueDates = new Set();
    return data.filter((d) => {
      const dateStr = new Date(d.date).toISOString();
      if (!uniqueDates.has(dateStr)) {
        uniqueDates.add(dateStr);
        return true;
      }
      return false;
    });
  };

  const renderChart = (symbol, data) => {
    const chartProperties = {
      width: 1500,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };
  
    const chartElement = document.getElementById("daily-chart");
  
    // Clear the existing chart before rendering a new one
    chartElement.innerHTML = "";
  
    const chart = createChart(chartElement, chartProperties);
    chart.priceScale('right').applyOptions({
      mode: PriceScaleMode.Logarithmic
    })
    console.log(chart)
    const candleSeries = chart.addCandlestickSeries();
  
    // Transform your cleaned data structure to match the expected format
    const transformedData = data.map((d) => ({
      time: new Date(d.date).getTime() / 1000,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
  
    candleSeries.setData(transformedData);

  
    // Add custom study overlay to show prices on the right side
    // chart.createStudy("CustomStudy", false, false, [1000], (overlay) => {
    //   overlay.setData(transformedData.map((d) => d.close));
    // });
  
    // Generate two random dates within the data range
    const randomDate1 = transformedData[800].time;
    const randomDate2 = transformedData[1000].time;
  
    // Draw trendline
    const trendlineSeries = chart.addLineSeries({
      color: "green",
      lineStyle: 1, // Solid line
    });
  
    const trendlineData = [
      { time: randomDate1, value: transformedData[800].low }, // Start from the low of the first candle
      { time: randomDate2, value: transformedData[1000].low }, // End at the high of the last candle
    ];
  
    trendlineSeries.setData(trendlineData);
  };
  

  return (
    <div>
      {dailyData && dailyData.length > 0 && (
        <div>
          <h2>Symbol: {dailyData[0].symbol}</h2>
          <div id="daily-chart"></div>
        </div>
      )}
    </div>
  );
};

export default DailyData;
