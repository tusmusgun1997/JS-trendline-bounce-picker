import React, { useEffect } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";

const WeeklyData = ({ weeklyData, weeklyHighTrendlineData, weeklyLowTrendlineData }) => {
  useEffect(() => {
    if (weeklyData && weeklyData.length > 0) {
      const cleanedData = removeDuplicateDates(weeklyData);
      renderChart(weeklyData[0].symbol, cleanedData, weeklyHighTrendlineData, weeklyLowTrendlineData);
    }
  }, [weeklyData, weeklyHighTrendlineData, weeklyLowTrendlineData]);

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

  const renderChart = (symbol, data, highTrendlineData, lowTrendlineData) => {
    const chartProperties = {
      width: 1400,
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
    })).sort((data1, data2) => {
      if(data1['time'] < data2['time']) return -1;
      else return 1 
    });

    console.log(transformedData)

    candleSeries.setData(transformedData);


    // Draw high trendline
    if (highTrendlineData && highTrendlineData.length > 0) {

      highTrendlineData.forEach((dataPoint) => {
        const highTrendlineSeries = chart.addLineSeries({
          color: "red",
          lineStyle: 1, // Solid line
        });

       const transformedData =  [{
          time: new Date(dataPoint.start).getTime() / 1000,
          value: dataPoint.start_intercept,
        },
        {
          time: new Date(dataPoint.end).getTime() / 1000,
          value: dataPoint.end_intercept,
        },]
        highTrendlineSeries.setData(transformedData);

        return transformedData

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
        ]
        lowTrendlineSeries.setData(transformedData);

        return transformedData
      });


    }
  };

  return (
    <div>
      {weeklyData && weeklyData.length > 0 && (
        <div>
          <div id="weekly-chart"></div>
        </div>
      )}
    </div>
  );
};

export default WeeklyData;
