import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import axios from 'axios';

// TODO
const PriceChart = () => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.auth.auth_token);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios
      .get('http://localhost:5001/users/assetPerformance', config)
      .then((res) => {
        console.log('data', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="">
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
