import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPool, joinPool } from '../../features/pools/poolsSlice';

const JoinForm = ({ poolId, modalVisible, setModalVisible, modify, currentContribution }) => {
  const [formData, setFormData] = useState({
    contribution: currentContribution || 0,
  });

  const dispatch = useDispatch();

  const token = useSelector((store) => store.auth.token);

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
    if (modify) {
      // dispatch({ type: 'pools/editPool', payload: { ...formData, email: token.email } });
      dispatch(editPool({ id: poolId, equity: parseInt(formData.contribution) }))
    } else {
      // dispatch({ type: 'pools/joinPool', payload: { ...formData, email: token.email } });
      dispatch(joinPool({ id: poolId, equity: parseInt(formData.contribution) }))
    }
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
                    {modify && 'Modify Pool'}
                    {!modify && 'Join Pool'}
                  </p>
                  <p>Empower people from all economic backgrounds to invest</p>
                </div>
                <div className="mt-4 max-w-lg mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-medium">
                        {modify &&
                          'Modify Contribution. Currently Invested:$' +
                            currentContribution.toLocaleString()}{' '}
                        {!modify && 'Join Pool'}
                      </label>
                      <input
                        type="number"
                        name="contribution"
                        value={formData.contribution}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-primary-darkgreen active:bg-primary-green rounded-lg duration-150 mt-4"
                    >
                      {modify && 'Modify Contribution'}
                      {!modify && 'Join Pool'}
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

export default JoinForm;
