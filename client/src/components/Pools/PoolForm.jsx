import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoolsAsync } from '../../features/pools/poolsSlice';
import ErrorAlert from '../Accessories/ErrorAlert/ErrorAlert';
import SuccessAlert from '../Accessories/SuccessAlert/SuccessAlert';

const PoolForm = ({ modalVisible, setModalVisible, listingId }) => {
  const dispatch = useDispatch();
  const wasListingIdPassed = listingId != null && listingId !== '' && listingId !== undefined;

  const [formData, setFormData] = useState({
    title: '',
    listingId: listingId || '',
    description: '',
    private: false,
    initialContribution: 0,
  });

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(null);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleChange = (e) => {
    if (e.target.name === 'private') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
      return;
    }
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
        contribution: formData.initialContribution,
      }),
    )
      .then((response) => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          setModalVisible(false);
        }, 2000);
      })
      .catch((error) => {
        if (error) {
          setIsErrorModalOpen(error.message);
          setTimeout(() => {
            setIsErrorModalOpen(null);
          }, 2000);
        }
      });
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
                        readOnly={wasListingIdPassed}
                        value={formData.listingId}
                        onChange={handleChange}
                        required
                        className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg ${
                          wasListingIdPassed
                            ? 'bg-green-100 cursor-not-allowed text-gray-800 font-mono font-semibold border-none'
                            : 'text-gray-500'
                        }`}
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
                        onClick={handleChange}
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
                {isErrorModalOpen && <ErrorAlert message={isErrorModalOpen} />}
                {isSuccessModalOpen && (
                  <SuccessAlert message={'New Pool Created! Make a Splash!.'} />
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </main>
  );
};

export default PoolForm;
