// chartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chart: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChart: (state, action) => {
      state.chart = action.payload;
    },
  },
});

export const { setChart } = chartSlice.actions;

export const selectChart = (state) => state.chart.chart;

export default chartSlice.reducer;
