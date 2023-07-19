import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPool, addPoolsAsync } from '../../features/pools/poolsSlice';
import { fetchListings } from '../../features/listings/listingsSlice';

const PoolForm = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const listings = useSelector((store) => store.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: '',
    listingId: '',
    description: '',
    private: false,
    initialContribution: 0,
  });

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPoolsAsync({
        name: formData.title,
        listingId: formData.listingId,
        private: formData.private,
        contribution : formData.initialContribution,
      }),
    );
    setModalVisible(false);
  };

  return (
    <main>
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4">
          <div className="relative bg-white rounded-md text-gray-600 overflow-y-auto max-h-screen">
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
                    New Pool
                  </p>
                  <p>Empower people from all economic backgrounds to invest</p>
                </div>
                <div className="mt-4 max-w-lg mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-medium">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Listing ID</label>
                      <input
                        type="text"
                        name="listingId"
                        value={formData.listingId}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Your Contribution</label>
                      <input
                        type="number"
                        name="initialContribution"
                        value={formData.initialContribution}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      ></textarea>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="private"
                        value={formData.private}
                        onChange={handleChange}
                        className="m-2"
                      />
                      <label className="font-medium">Private</label>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-primary-darkgreen active:bg-primary-green rounded-lg duration-150 mt-4"
                    >
                      Add Pool
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </main>
  );
};

export default PoolForm;
