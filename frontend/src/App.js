// frontend/my-react-app/src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainDashboard from './components/MainDashboard';
import DailyData from './components/DailyData';
import WeeklyData from './components/WeeklyData';
import StockData from './components/StockData';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <MainDashboard>
          <Routes>
            <Route path="/daily/:symbol" element={<DailyData />} />
            <Route path="/weekly/:symbol" element=  {<WeeklyData/>}/>
            <Route path="/stock/:symbol" element = {<StockData/>}/>
            <Route path="/*" element={<Navigate to="/" />} />{" "}

          </Routes>
        </MainDashboard>
      </div>
    </BrowserRouter>
  );
}

export default App;
