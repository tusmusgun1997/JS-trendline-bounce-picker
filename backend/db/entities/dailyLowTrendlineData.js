const mongoose = require('mongoose');

const dailyLowTrendlineSchema = new mongoose.Schema({
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

const DailyLowTrendlineData = mongoose.model('DailyLowTrendlineData', dailyLowTrendlineSchema, 'daily_low_trendline_data');

module.exports = DailyLowTrendlineData;
