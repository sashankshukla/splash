import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';

import Pool from '../Pool/Pool';

import Filter from '../Filter/Filter';
import PoolForm from './PoolForm';

const Pools = () => {
  const [formVisible, setFormVisible] = useState(false);

  const pools = useSelector((state) => state.pools);

  return (
    <div
      id="pools-page-container"
      className="flex flex-col justify-center items-center pt-16 mx-4"
    >
      <Filter />
      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
        onClick={() => setFormVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Pool</span>
      </button>
      <PoolForm modalVisible={formVisible} setModalVisible={setFormVisible} />
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