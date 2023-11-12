// entities/WeeklyLowTrendline.js

const mongoose = require('mongoose');

const weeklyLowTrendlineSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  trendline_data: [
    {
        start: { type: String, required: true },
        start_intercept: { type: Number, required: true },
        continuation: { type: String, required: true },
        continuation_intercept: { type: Number, required: true },
        end: { type: String, required: true },
        end_intercept: { type: Number, required: true },
    },
  ],
});

const WeeklyLowTrendlineData = mongoose.model('WeeklyLowTrendlineData', weeklyLowTrendlineSchema, 'weekly_low_trendline_data');

module.exports = WeeklyLowTrendlineData;
