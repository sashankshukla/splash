import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../Accessories/LoadingSpinner/LoadingSpinner';

const PriceChart = () => {
  const [data, setData] = useState(null);
  const user = useSelector((store) => store.auth.user);

  const transformData = (data) => {
    let result = {};
    let today = new Date();
    for (let asset in data) {
      let prices = data[asset];
      let numDays = prices.length;
      for (let i = 0; i < numDays; i++) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        let dateString = date.toISOString().split('T')[0]; // format as "yyyy-mm-dd"
        if (!result[dateString]) {
          result[dateString] = 0;
        }
        result[dateString] += prices[numDays - 1 - i];
      }
    }
    return result;
  };

  useEffect(() => {
    const priceDictionary = user.priceDictionary;
    console.log(priceDictionary);
    const transformedData = transformData(priceDictionary);
    setData(transformedData);
  }, [user.priceDictionary]);

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
