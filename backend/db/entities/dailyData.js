// backend/entities/daily_data.js

const mongoose = require('mongoose');

// Define the schema for daily data
const dailyDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  data: [
    {
      open: {
        type: Number,
        required: true,
      },
      low: {
        type: Number,
        required: true,
      },
      high: {
        type: Number,
        required: true,
      },
      close: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create a model with the schema
const DailyData = mongoose.model('DailyData', dailyDataSchema, 'daily_stocks_data');

// Export the model
module.exports = DailyData;
