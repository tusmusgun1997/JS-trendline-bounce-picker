// redux/stockDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDailyData,
  getWeeklyData,
  getWeeklyHighTrendlineData,
  getWeeklyLowTrendlineData,
  getDailyHighTrendlineData,
  getDailyLowTrendlineData,
} from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch both daily, weekly data, and trendline data for a symbol
export const fetchStockData = createAsyncThunk('stockData/fetchStockData', async (symbol) => {
  // Fetch both daily and weekly data
  const dailyResponse = await getDailyData(symbol) ?? [];
  const weeklyResponse = await getWeeklyData(symbol) ?? [];

  // Fetch weekly high and low trendline data
  const weeklyHighTrendlineResponse = await getWeeklyHighTrendlineData(symbol);
  const weeklyLowTrendlineResponse = await getWeeklyLowTrendlineData(symbol);

  // Fetch daily high and low trendline data
  const dailyHighTrendlineResponse = await getDailyHighTrendlineData(symbol);
  console.log(dailyHighTrendlineResponse)
  const dailyLowTrendlineResponse = await getDailyLowTrendlineData(symbol);

  return {
    symbol,
    dailyData: dailyResponse.data[0]['data'] ?? [],
    weeklyData: weeklyResponse.data[0]['data'] ?? [],
    weeklyHighTrendlineData: weeklyHighTrendlineResponse.trendlineData ?? [],
    weeklyLowTrendlineData: weeklyLowTrendlineResponse.trendlineData ?? [],
    dailyHighTrendlineData: dailyHighTrendlineResponse.trendlineData ?? [],
    dailyLowTrendlineData: dailyLowTrendlineResponse.trendlineData ?? [],
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
    dailyHighTrendlineData: [],
    dailyLowTrendlineData: [],
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
        state.dailyHighTrendlineData = action.payload.dailyHighTrendlineData;
        state.dailyLowTrendlineData = action.payload.dailyLowTrendlineData;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSymbolSelected } = stockDataSlice.actions;

export default stockDataSlice.reducer;
