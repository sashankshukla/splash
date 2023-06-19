import React from 'react';

const ListingForm = ({modalVisible, setModalVisible}) => {

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    // Add listing to database
    // Redirect to listings page
    setModalVisible(false);
  }

  return (
    <main className="py-14 mx-8">
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
                    New Listing
                  </p>
                  <p>Empower people from all economic backgrounds to invest</p>
                </div>
                <div className="mt-4 max-w-lg mx-auto">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                    <div>
                      <label className="font-medium">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Address</label>
                      <input
                        type="text"
                        required
                        placeholder="Street"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                      <div className="flex flex-wrap -mx-3 my-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="font-medium">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="font-medium">Country</label>
                          <input
                            type="text"
                            placeholder="Country"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Postal Code"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Investment Type</label>
                      <select className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg">
                        <option value="" disabled selected>
                          Select a category
                        </option>
                        <option value="1">House/ Living Accomodation</option>
                        <option value="2">Franchise</option>
                        <option value="3">Gas Station</option>
                        <option value="4">Stock Portfolio</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium">Price</label>
                      <input
                        type="number"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Description</label>
                      <textarea
                        required
                        className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      ></textarea>
                    </div>
                    <div>
                      <label className="font-medium">Images</label>
                      <input
                        type="file"
                        required
                        multiple
                        accept="image/*"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <button onClick={handleSubmit} className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-indigo-500 active:bg-primary-green rounded-lg duration-150">
                      Add Listing
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

export default ListingForm;
