// redux/stockDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDailyData, getWeeklyData } from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch both daily and weekly data for a symbol
export const fetchStockData = createAsyncThunk('stockData/fetchStockData', async (symbol) => {
  // Fetch both daily and weekly data
  const dailyResponse = await getDailyData(symbol);
  const weeklyResponse = await getWeeklyData(symbol);

  return {
    symbol,
    dailyData: dailyResponse.data ?? [],
    weeklyData: weeklyResponse.data ?? [],
  };
});

// Create a stockData slice
const stockDataSlice = createSlice({
  name: 'stockData',
  initialState: {
    symbolSelected: '',
    dailyData: [],
    weeklyData: [],
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
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSymbolSelected } = stockDataSlice.actions;

export default stockDataSlice.reducer;
