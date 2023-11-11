// backend/helpers/daily_data.js

const DailyData = require('../entities/dailyData');

// Function to fetch data for a given symbol
async function fetchDataForSymbol(symbol) {
  try {
    // Use the DailyData model to find data for the provided symbol
    const data = await DailyData.find({ symbol });

    return data;
  } catch (error) {
    console.error(`Error fetching data for symbol ${symbol}: ${error.message}`);
    throw error;
  }
}
async function fetchDistinctSymbolsWithSearchString(searchString) {
  try {
    // Use the DailyData model to find distinct symbols that contain the search string
    const symbols = await DailyData.distinct('symbol', { symbol: { $regex: searchString, $options: 'i' } });

    return symbols;
  } catch (error) {
    console.error(`Error fetching distinct symbols with search string ${searchString}: ${error.message}`);
    throw error;
  }
}
// Export the fetchDataForSymbol function
module.exports = {
  fetchDataForSymbol,
  fetchDistinctSymbolsWithSearchString,
};
