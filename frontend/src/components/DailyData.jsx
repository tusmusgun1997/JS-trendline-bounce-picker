// DailyData.jsx

import React, { useEffect } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import styles from './DailyData.module.css'

const DailyData = ({ data, dailyHighTrendlineData, dailyLowTrendlineData }) => {
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

  useEffect(() => {
    if (data && data.length > 0) {
      const cleanedData = removeDuplicateDates(data);
      renderChart(data[0].symbol, cleanedData, dailyHighTrendlineData, dailyLowTrendlineData);
    }
  }, [data, dailyHighTrendlineData, dailyLowTrendlineData]);

  const renderChart = (symbol, data, highTrendlineData, lowTrendlineData) => {
    const chartProperties = {
      width: 1400,
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
    });
    const candleSeries = chart.addCandlestickSeries();
    // Transform your cleaned data structure to match the expected format
    const transformedData = data.map((d) => ({
      time: new Date(d.date).getTime() / 1000,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    })).sort((data1, data2) => {
      if(data1['time'] < data2['time']) return -1;
      else return 1 
    });

    candleSeries.setData(transformedData);

    // Draw high trendline
    if (highTrendlineData && highTrendlineData.length > 0) {
      highTrendlineData.forEach((dataPoint) => {
        const highTrendlineSeries = chart.addLineSeries({
          color: "red",
          lineStyle: 1, // Solid line
        });

        const transformedData = [
          {
            time: new Date(dataPoint.start).getTime() / 1000,
            value: dataPoint.start_intercept,
          },
          {
            time: new Date(dataPoint.end).getTime() / 1000,
            value: dataPoint.end_intercept,
          },
        ];
        highTrendlineSeries.setData(transformedData);
      });
    }

    // Draw low trendline
    if (lowTrendlineData && lowTrendlineData.length > 0) {
      lowTrendlineData.forEach((dataPoint) => {
        const lowTrendlineSeries = chart.addLineSeries({
          color: "green",
          lineStyle: 1, // Solid line
        });
        const transformedData = [
          {
            time: new Date(dataPoint.start).getTime() / 1000,
            value: dataPoint.start_intercept,
          },
          {
            time: new Date(dataPoint.end).getTime() / 1000,
            value: dataPoint.end_intercept,
          },
        ];
        lowTrendlineSeries.setData(transformedData);
      });
    }
  };

  return (
    <div>
      {data && data.length > 0 && (
        <div>
          <div id="daily-chart" className={styles.dailyChart}></div>
        </div>
      )}
    </div>
  );
};

export default DailyData;
