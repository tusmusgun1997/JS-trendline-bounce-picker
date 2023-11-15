// globalStockDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllWeeklyHighTrendlineData,
  getAllWeeklyLowTrendlineData,
} from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch all weekly high trendline data
export const fetchAllWeeklyHighTrendlineData = createAsyncThunk(
  'globalStockData/fetchAllWeeklyHighTrendlineData',
  async () => {
    try {
      const response = await getAllWeeklyHighTrendlineData();
      return response.allTrendlineData;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch all weekly low trendline data
export const fetchAllWeeklyLowTrendlineData = createAsyncThunk(
  'globalStockData/fetchAllWeeklyLowTrendlineData',
  async () => {
    try {
      const response = await getAllWeeklyLowTrendlineData();
      return response.allTrendlineData;
    } catch (error) {
      throw error;
    }
  }
);

// Create a globalStockData slice
const globalStockDataSlice = createSlice({
  name: 'globalStockData',
  initialState: {
    allWeeklyHighTrendlineData: [],
    allWeeklyLowTrendlineData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWeeklyHighTrendlineData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllWeeklyHighTrendlineData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allWeeklyHighTrendlineData = action.payload;
      })
      .addCase(fetchAllWeeklyHighTrendlineData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllWeeklyLowTrendlineData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllWeeklyLowTrendlineData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allWeeklyLowTrendlineData = action.payload;
      })
      .addCase(fetchAllWeeklyLowTrendlineData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default globalStockDataSlice.reducer;
