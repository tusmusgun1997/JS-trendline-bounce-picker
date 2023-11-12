// frontend/my-react-app/src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import symbolReducer from './symbolsSlice';
import dailyDataReducer from './dailyDataSlice';
import weeklyDataReducer from './weeklyDataSlice';
import stockDataReducer from './stockDataSlice';

// Import your reducers here when you create them
// import someReducer from './someReducer';

const store = configureStore({
  reducer: {
    symbols: symbolReducer,
    dailyData: dailyDataReducer,
    weeklyData: weeklyDataReducer,
    stockData: stockDataReducer,
  },
});

export default store;
