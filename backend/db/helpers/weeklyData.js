// backend/helpers/weekly_data.js

const WeeklyData = require('../entities/weeklyData');

// Function to fetch and sort weekly data for a given symbol
async function fetchAndSortWeeklyDataForSymbol(symbol) {
  try {
    // Use the WeeklyData model to find data for the provided symbol and sort by date in ascending order
    const data = await WeeklyData.find({ symbol })

    return data;
  } catch (error) {
    console.error(`Error fetching and sorting weekly data for symbol ${symbol}: ${error.message}`);
    throw error;
  }
}

// Export the fetchAndSortWeeklyDataForSymbol function
module.exports = {
  fetchAndSortWeeklyDataForSymbol,
};
