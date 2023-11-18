const DailyHighTrendlineData = require('../entities/dailyHighTrendlineData');

async function getDailyHighTrendlineDataBySymbol(symbol) {
  try {
    const data = await DailyHighTrendlineData.findOne({ symbol });
    return data ? data.trendline_data : [];
  } catch (error) {
    throw new Error(`Error while fetching daily high trendline data for symbol ${symbol}: ${error.message}`);
  }
}

async function getAllDailyHighTrendlineData() {
  try {
    const data = await DailyHighTrendlineData.find();
    console.log(data)
    return data.map(entry => ({ symbol: entry.symbol, trendline_data: entry.trendline_data }));
  } catch (error) {
    throw new Error(`Error while fetching all daily high trendline data: ${error.message}`);
  }
}

module.exports = {
  getDailyHighTrendlineDataBySymbol,
  getAllDailyHighTrendlineData,
};
