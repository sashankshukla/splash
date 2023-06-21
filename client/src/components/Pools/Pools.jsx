import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import Pool from '../Pool/Pool';

import Filter from '../Filter/Filter';
import PoolForm from './PoolForm';

const Pools = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
        onClick={() => setModalVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Pool</span>
      </button>
      <PoolForm modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <div
        id="pools-container"
        className="flex"
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