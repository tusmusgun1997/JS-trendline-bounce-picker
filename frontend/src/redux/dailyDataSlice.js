// redux/dailyDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDailyData } from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch daily data for a symbol
export const fetchDailyData = createAsyncThunk('dailyData/fetchDailyData', async (symbol) => {
  const response = await getDailyData(symbol);
  return response.data; // Assuming the API response has a "data" property
});

// Create a dailyData slice
const dailyDataSlice = createSlice({
  name: 'dailyData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDailyData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dailyDataSlice.reducer;
