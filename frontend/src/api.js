import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Update the port if your backend server is running on a different port

// Function to fetch daily data for a symbol
export const getDailyData = async (symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/daily-data/${symbol}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to fetch weekly data for a symbol
export const getWeeklyData = async (symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/weekly-data/${symbol}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to search for symbols containing the search string
export const searchSymbols = async (search) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-symbols?search=${search}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
