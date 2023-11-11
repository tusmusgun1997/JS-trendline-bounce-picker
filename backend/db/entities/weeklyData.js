// backend/entities/weeklyData.js

const mongoose = require('mongoose');

// Define the schema for weekly data
const weeklyDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
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
});

// Create a model with the schema
const WeeklyData = mongoose.model('WeeklyData', weeklyDataSchema, 'weekly_stocks_data');

// Export the model
module.exports = WeeklyData;
