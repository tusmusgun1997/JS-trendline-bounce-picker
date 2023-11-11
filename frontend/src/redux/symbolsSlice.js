// redux/symbolSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchSymbols } from '../api'; // Adjust the path based on your project structure

// Async thunk to fetch symbols
export const fetchSymbols = createAsyncThunk('symbols/fetchSymbols', async (searchQuery) => {
  const response = await searchSymbols(searchQuery);
  return response.symbols; // Assuming the API response has a "symbols" property
});

// Create a symbol slice
const symbolSlice = createSlice({
  name: 'symbols',
  initialState: {
    list: [],
    showResults: false, // Initial state to hide the results
    status: 'idle',
    error: null,
  },
  reducers: {
    setShowResults: (state, action) => {
      state.showResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbols.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.showResults = true; // Show results when data is fetched
      })
      .addCase(fetchSymbols.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.showResults = false; // Hide results on error
      });
  },
});

export const { setShowResults } = symbolSlice.actions;
export default symbolSlice.reducer;
