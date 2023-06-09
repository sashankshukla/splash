import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Pool from '../Pool/Pool';

import Filter from '../Filter/Filter';
import PoolForm from './PoolForm';

const Pools = () => {
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const pools = useSelector((state) => state.pools);

  useEffect(() => {
    if (Object.keys(token).length === 0) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div id="pools-page-container" className="flex flex-col justify-center items-center pt-16 mx-4">
      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
        onClick={() => setFormVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Pool</span>
      </button>
      <PoolForm modalVisible={formVisible} setModalVisible={setFormVisible} />
      <div id="pools-container" className="flex">
        {pools.map((pool, idx) => {
          return <Pool key={idx} {...pool} />;
        })}
      </div>
    </div>
  );
};
export default Pools;
