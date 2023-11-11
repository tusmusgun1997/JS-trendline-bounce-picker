// Importing the express module
const express = require('express');
const { fetchDataForSymbol, fetchDistinctSymbolsWithSearchString } = require('./db/helpers/dailyData');
const { fetchAndSortWeeklyDataForSymbol } = require('./db/helpers/weeklyData');
const connectDB = require('./db/config');
const cors = require("cors");

connectDB()

// Creating an Express application
const app = express();
app.use(cors());
// Define a route for the root URL
app.get('/api/daily-data/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    // Use the daily data helper function to fetch data for the provided symbol
    const data = await fetchDataForSymbol(symbol);

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to fetch and sort weekly data for a symbol
app.get('/api/weekly-data/:symbol', async (req, res) => {
  const { symbol } = req.params;
  console.log(symbol)

  try {
    // Use the weekly data helper function to fetch and sort data for the provided symbol
    const data = await fetchAndSortWeeklyDataForSymbol(symbol);

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search-symbols', async (req, res) => {
  const { search } = req.query;
  console.log(search)

  try {
    // Use the helper function to fetch distinct symbols containing the search string
    const symbols = await fetchDistinctSymbolsWithSearchString(search);

    res.json({ symbols });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
