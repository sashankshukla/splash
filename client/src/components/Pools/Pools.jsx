import React, { useState } from 'react';

import Pool from '../Pool/Pool';

import Filter from '../Filter/Filter';

const Pools = () => {
  const pools = [
    {
      title: 'Tech Stocks Pool',
      id: 'TSK389',
      members: 18,
      totalValue: 12150.37,
      remaining: 2573.52,
      contribution: 0,
    },
    {
      title: 'Green Energy Bonds',
      id: 'GEB412',
      members: 24,
      totalValue: 9000.0,
      remaining: 3245.27,
      contribution: 0,
    },
    {
      title: 'Real Estate Investment Pool',
      id: 'REI723',
      members: 10,
      totalValue: 45000.45,
      remaining: 15000.0,
      contribution: 0,
    },
    {
      title: 'Crypto Assets Pool',
      id: 'CAP217',
      members: 50,
      totalValue: 25000.77,
      remaining: 8756.12,
      contribution: 0,
    },
  ];

  return (
    <div
      id="pools-page-container"
      className="flex flex-col justify-center items-center pt-16 mx-4"
    >
      <Filter />
      <div
        id="pools-container"
        className="flex flex-wrap justify-center items-center content-evenly p-2 overflow-hidden"
      >
        {pools.map((pool, idx) => {
          return (
            <Pool
              key={idx}
              title={pool.title}
              id={pool.id}
              members={pool.members}
              totalValue={pool.totalValue}
              remaining={pool.remaining}
              contribution={pool.contribution}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Pools;