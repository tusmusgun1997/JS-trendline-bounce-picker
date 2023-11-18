const DailyLowTrendlineData = require('../entities/dailyLowTrendlineData');

async function getDailyLowTrendlineDataBySymbol(symbol) {
  try {
    const data = await DailyLowTrendlineData.findOne({ symbol });
    return data ? data.trendline_data : [];
  } catch (error) {
    throw new Error(`Error while fetching daily low trendline data for symbol ${symbol}: ${error.message}`);
  }
}

async function getAllDailyLowTrendlineData() {
  try {
    const data = await DailyLowTrendlineData.find();
    return data.map(entry => ({ symbol: entry.symbol, trendline_data: entry.trendline_data }));
  } catch (error) {
    throw new Error(`Error while fetching all daily low trendline data: ${error.message}`);
  }
}

module.exports = {
  getDailyLowTrendlineDataBySymbol,
  getAllDailyLowTrendlineData,
};
