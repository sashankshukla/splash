import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const PriceChart = () => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.auth.auth_token);

  const transformData = (data) => {
    let result = {};

    // Get today's date
    let today = new Date();

    // For each asset...
    for (let asset in data) {
      let prices = data[asset];
      let numDays = prices.length;

      // For each day...
      for (let i = 0; i < numDays; i++) {
        // Get the date for this price
        let date = new Date();
        date.setDate(today.getDate() - i);
        let dateString = date.toISOString().split('T')[0]; // format as "yyyy-mm-dd"

        // If we don't have this date in the result yet, add it
        if (!result[dateString]) {
          result[dateString] = 0;
        }

        // Add this price to the total for this date
        result[dateString] += prices[numDays - 1 - i];
      }
    }
    return result;
  }


  useEffect(() => {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios
      .get('http://localhost:5001/users/assetPerformance', config)
      .then((res) => {
        const result = transformData(res.data);
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      {!data && <LoadingSpinner />}
      {data && (
        <Plot
          data={[
            {
              x: Object.keys(data),
              y: Object.values(data),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: '#589f9f' },
            },
          ]}
          layout={{
            width: window.innerWidth,
            height: 700,
          }}
        />
      )}
    </div>
  );
};

export default PriceChart;
