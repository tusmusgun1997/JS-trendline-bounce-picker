// Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllDailyHighTrendlineData, fetchAllDailyLowTrendlineData, fetchAllWeeklyHighTrendlineData, fetchAllWeeklyLowTrendlineData } from '../redux/globalStockDataSlice';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allWeeklyHighTrendlineData = useSelector((state) => state.globalStockData.allWeeklyHighTrendlineData);
  const allWeeklyLowTrendlineData = useSelector((state) => state.globalStockData.allWeeklyLowTrendlineData);
  const allDailyHighTrendlineData = useSelector((state) => state.globalStockData.allDailyHighTrendlineData);
  const allDailyLowTrendlineData = useSelector((state) => state.globalStockData.allDailyLowTrendlineData);
  const status = useSelector((state) => state.globalStockData.status);

  const [displayLowTrendline, setDisplayLowTrendline] = React.useState(true);

  useEffect(() => {
    dispatch(fetchAllWeeklyHighTrendlineData());
  }, [dispatch]);

  const handleFetchLowTrendlineData = () => {
    dispatch(fetchAllWeeklyLowTrendlineData());
    dispatch(fetchAllDailyLowTrendlineData());
    setDisplayLowTrendline(true);
  };

  const handleFetchHighTrendlineData = () => {
    dispatch(fetchAllWeeklyHighTrendlineData());
    dispatch(fetchAllDailyHighTrendlineData());
    setDisplayLowTrendline(false);
  };

  const handleSquareClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button onClick={handleFetchLowTrendlineData}>Fetch Low Trendline</button>
        <button onClick={handleFetchHighTrendlineData}>Fetch High Trendline</button>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching data</p>}

      {displayLowTrendline && allWeeklyLowTrendlineData.length > 0 && (
        <div>
          <h2>All Weekly Low Trendline Data</h2>
          <div className={styles.squareGrid}>
            {allWeeklyLowTrendlineData.map((dataPoint, index) => (
              <div
                key={index}
                className={styles.square}
                onClick={() => handleSquareClick(dataPoint.symbol)}
              >
                <div className={styles.symbol}>{dataPoint.symbol}</div>
                <div className={styles.trendInfo}>
                  {/* <div>Start: {dataPoint.start}</div>
                  <div>End: {dataPoint.end}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <br />

      {displayLowTrendline && allDailyLowTrendlineData.length > 0 && (
        <div>
          <h2>All Daily Low Trendline Data</h2>
          <div className={styles.squareGrid}>
            {allDailyLowTrendlineData.map((dataPoint, index) => (
              <div
                key={index}
                className={styles.square}
                onClick={() => handleSquareClick(dataPoint.symbol)}
              >
                <div className={styles.symbol}>{dataPoint.symbol}</div>
                <div className={styles.trendInfo}>
                  {/* <div>Start: {dataPoint.start}</div>
                  <div>End: {dataPoint.end}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!displayLowTrendline && allWeeklyHighTrendlineData.length > 0 && (
        <div>
          <h2>All Weekly High Trendline Data</h2>
          <div className={styles.squareGrid}>
            {allWeeklyHighTrendlineData.map((dataPoint, index) => (
              <div
                key={index}
                className={styles.square}
                onClick={() => handleSquareClick(dataPoint.symbol)}
              >
                <div className={styles.symbol}>{dataPoint.symbol}</div>
                <div className={styles.trendInfo}>
                  {/* <div>Start: {dataPoint.start}</div>
                  <div>End: {dataPoint.end}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!displayLowTrendline && allDailyHighTrendlineData.length > 0 && (
        <div>
          <h2>All Daily High Trendline Data</h2>
          <div className={styles.squareGrid}>
            {allDailyHighTrendlineData.map((dataPoint, index) => (
              <div
                key={index}
                className={styles.square}
                onClick={() => handleSquareClick(dataPoint.symbol)}
              >
                <div className={styles.symbol}>{dataPoint.symbol}</div>
                <div className={styles.trendInfo}>
                  {/* <div>Start: {dataPoint.start}</div>
                  <div>End: {dataPoint.end}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Home;
