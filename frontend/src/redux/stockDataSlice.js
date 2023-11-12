// redux/stockDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDailyData,
  getWeeklyData,
  getWeeklyHighTrendlineData,
  getWeeklyLowTrendlineData,
} from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch both daily, weekly data, and weekly trendline data for a symbol
export const fetchStockData = createAsyncThunk('stockData/fetchStockData', async (symbol) => {
  // Fetch both daily and weekly data
  const dailyResponse = await getDailyData(symbol);
  const weeklyResponse = await getWeeklyData(symbol);

  // Fetch weekly high and low trendline data
  const weeklyHighTrendlineResponse = await getWeeklyHighTrendlineData(symbol);
  const weeklyLowTrendlineResponse = await getWeeklyLowTrendlineData(symbol);
  console.log(weeklyLowTrendlineResponse.trendlineData)

  return {
    symbol,
    dailyData: dailyResponse.data[0]['data'] ?? [],
    weeklyData: weeklyResponse.data ?? [],
    weeklyHighTrendlineData: weeklyHighTrendlineResponse.trendlineData ?? [],
    weeklyLowTrendlineData: weeklyLowTrendlineResponse.trendlineData ?? [],
  };
});

// Create a stockData slice
const stockDataSlice = createSlice({
  name: 'stockData',
  initialState: {
    symbolSelected: '',
    dailyData: [],
    weeklyData: [],
    weeklyHighTrendlineData: [],
    weeklyLowTrendlineData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSymbolSelected: (state, action) => {
      state.symbolSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.symbolSelected = action.payload.symbol;
        state.dailyData = action.payload.dailyData;
        state.weeklyData = action.payload.weeklyData;
        state.weeklyHighTrendlineData = action.payload.weeklyHighTrendlineData;
        state.weeklyLowTrendlineData = action.payload.weeklyLowTrendlineData;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSymbolSelected } = stockDataSlice.actions;

export default stockDataSlice.reducer;
