// WeeklyData.jsx

import React, { useEffect } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";

const WeeklyData = ({ data }) => {
  useEffect(() => {
    if (data && data.length > 0) {
      const cleanedData = removeDuplicateDates(data);
      renderChart(data[0].symbol, cleanedData);
    }
  }, [data]);

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
      },
    };

    const chartElement = document.getElementById("weekly-chart");

    // Clear the existing chart before rendering a new one
    chartElement.innerHTML = "";

    const chart = createChart(chartElement, chartProperties);
    chart.priceScale('right').applyOptions({
      mode: PriceScaleMode.Logarithmic,
    });

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

    // Generate two random dates within the data range
    const randomDate1 = transformedData[8].time;
    const randomDate2 = transformedData[15].time;

    // Draw trendline
    const trendlineSeries = chart.addLineSeries({
      color: "green",
      lineStyle: 1, // Solid line
    });

    const trendlineData = [
      { time: randomDate1, value: transformedData[8].low }, // Start from the low of the first candle
      { time: randomDate2, value: transformedData[15].low }, // End at the high of the last candle
    ];

    trendlineSeries.setData(trendlineData);
  };

  return (
    <div>
      {data && data.length > 0 && (
        <div>
          <div id="weekly-chart"></div>
        </div>
      )}
    </div>
  );
};

export default WeeklyData;
