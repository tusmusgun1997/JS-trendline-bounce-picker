// redux/weeklyDataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeeklyData } from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch weekly data for a symbol
export const fetchWeeklyData = createAsyncThunk('weeklyData/fetchWeeklyData', async (symbol) => {
  const response = await getWeeklyData(symbol);
  console.log(response.data)
  return response.data; // Assuming the API response has a "data" property
});

// Create a weeklyData slice
const weeklyDataSlice = createSlice({
  name: 'weeklyData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklyData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeeklyData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weeklyDataSlice.reducer;
