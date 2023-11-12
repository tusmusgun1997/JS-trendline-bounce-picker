import React from 'react'
import styles from "./MainDashboard.module.css";
import Header from './Header';
import { useSelector } from 'react-redux';
import SearchResults from './SearchResults';
import DailyData from './DailyData';
import { Navigate, Route, Routes } from 'react-router-dom';
import WeeklyData from './WeeklyData';
import StockData from './StockData';


const MainDashboard = () => {
    const showResults = useSelector((state) => state.symbols.showResults);
    return (
    <div className={styles.mainDashboard}>
        <Header />
        {showResults && <SearchResults/>}
        <Routes>
            <Route path="/daily/:symbol" element={<DailyData />} />
            <Route path="/weekly/:symbol" element=  {<WeeklyData/>}/>
            <Route path="/stock/:symbol" element = {<StockData/>}/>
            <Route path="/*" element={<Navigate to="/" />} />{" "}
        </Routes>

    </div>
    )
}

export default MainDashboard