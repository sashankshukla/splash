import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlusCircle, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchPools, getPoolsData } from '../../features/pools/poolsSlice';

import Pool from './Pool/Pool';

import Filter from '../Filter/Filter';
import PoolForm from './PoolForm';
import PrivatePoolForm from './PrivatePoolForm';

const Pools = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [privateFormVisible, setPrivateFormVisible] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const { pools, isError, isSuccess, isLoading, message } = useSelector(getPoolsData);

  useEffect(() => {
    if (Object.keys(token).length === 0) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(fetchPools());
    }
  }, [dispatch, token]);

  return (
    <div id="pools-page-container" className="flex flex-col justify-around items-center pt-16 mx-4">
      <div className="flex flex-row justify-center items-center">
        <button
          className="px-4 py-2 mt-8 mr-2 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
          onClick={() => setAddFormVisible(true)}
        >
          <FaPlusCircle className="mt-1 mr-1" />
          <span>Add New Pool</span>
        </button>
        <button
          className="px-4 py-2 mt-8 ml-2 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
          onClick={() => setPrivateFormVisible(true)}
        >
          <FaLock className="mt-1 mr-1" />
          <span>Join Private Pool</span>
        </button>
      </div>
      <PoolForm modalVisible={addFormVisible} setModalVisible={setAddFormVisible} />
      <PrivatePoolForm modalVisible={privateFormVisible} setModalVisible={setPrivateFormVisible} />
      <div
        id="pools-container"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {pools.map((pool, idx) => {
          return (
            <Pool
              key={idx}
              poolId={pool._id}
              title={pool.name}
              createdBy={pool.createdBy}
              listingId={pool.listingId}
              members={pool.users}
              totalValue={pool.totalValue}
              remaining={pool.remaining}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Pools;
