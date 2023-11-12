// functions/getWeeklyHighTrendlineData.js

const WeeklyHighTrendlineData = require('../entities/weeklyHighTrendlineData');

async function getWeeklyHighTrendlineDataBySymbol(symbol) {
  try {
    const data = await WeeklyHighTrendlineData.findOne({ symbol });
    return data ? data.trendline_data : [];
  } catch (error) {
    throw new Error(`Error while fetching weekly high trendline data for symbol ${symbol}: ${error.message}`);
  }
}

async function getAllWeeklyHighTrendlineData() {
  try {
    const data = await WeeklyHighTrendlineData.find();
    console.log(data)
    return data.map(entry => ({ symbol: entry.symbol, trendline_data: entry.trendline_data }));
  } catch (error) {
    throw new Error(`Error while fetching all weekly high trendline data: ${error.message}`);
  }
}

module.exports = {
  getWeeklyHighTrendlineDataBySymbol,
  getAllWeeklyHighTrendlineData,
};
