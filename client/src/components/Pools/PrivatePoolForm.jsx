import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from '../../features/listings/listingsSlice';
import Pool from '../Pool/Pool';

const PrivatePoolForm = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const [pool, setPool] = useState(null);
  const token = useSelector((store) => store.auth.auth_token);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    poolId: '',
  });

  const toggleModalVisibility = () => {
    setModalVisible(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    e.preventDefault();
    console.log(formData.poolId);
    axios
      .get(`http://localhost:5001/pools/private/${formData.poolId}`, config)
      .then((res) => {
        console.log(res.data);
        setPool(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      {modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4"
          onClick={toggleModalVisibility}
        >
          <div
            className="relative bg-white rounded-md text-gray-600 overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleModalVisibility}
            >
              X
            </button>
            <main className="py-14 px-8">
              <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto pt-8 space-y-3 sm:text-center">
                  <p className="text-primary-darkgreen rounded-lg text-3xl font-semibold sm:text-4xl">
                    Join Private Pool
                  </p>
                </div>
                <div className="mt-4 max-w-lg mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-medium">Pool ID</label>
                      <input
                        type="text"
                        name="poolId"
                        value={formData.poolId}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-primary-darkgreen active:bg-primary-green rounded-lg duration-150 mt-4"
                    >
                      View Pool
                    </button>
                  </form>
                </div>
              </div>
            </main>
            {pool && (
              <Pool
                poolId={pool._id}
                title={pool.name}
                listingId={pool.listingId}
                members={pool.users}
                remaining={pool.remaining}
                totalValue={pool.totalValue}
                createdBy={pool.createdBy}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default PrivatePoolForm;
