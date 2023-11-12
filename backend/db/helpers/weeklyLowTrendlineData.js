// functions/getWeeklyLowTrendlineData.js

const WeeklyLowTrendlineData = require('../entities/weeklyLowTrendlineData');

async function getWeeklyLowTrendlineDataBySymbol(symbol) {
  try {
    const data = await WeeklyLowTrendlineData.findOne({ symbol });
    return data ? data.trendline_data : [];
  } catch (error) {
    throw new Error(`Error while fetching weekly low trendline data for symbol ${symbol}: ${error.message}`);
  }
}

async function getAllWeeklyLowTrendlineData() {
  try {
    const data = await WeeklyLowTrendlineData.find();
    return data.map(entry => ({ symbol: entry.symbol, trendline_data: entry.trendline_data }));
  } catch (error) {
    throw new Error(`Error while fetching all weekly low trendline data: ${error.message}`);
  }
}

module.exports = {
  getWeeklyLowTrendlineDataBySymbol,
  getAllWeeklyLowTrendlineData,
};
