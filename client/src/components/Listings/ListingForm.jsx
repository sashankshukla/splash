import React, { useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux'

const ListingForm = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    // listingId should be...?
    title: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    description: '',
    price: '',
    images: '', //for now it's just one url, maybe use extrafield thing as template for doing the same with images
    // seller should be the logged in user
    // status should always start as Available by default
    investmentType: '',
    extraFields: [],
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

  const handleExtraFieldChange = (e, index) => {
    const newExtraFields = formData.extraFields;
    newExtraFields[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      extraFields: newExtraFields,
    });
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      images: e.target.value,
    });
  };

  const addExtraField = () => {
    setFormData({
      ...formData,
      extraFields: [
        ...formData.extraFields,
        {
          name: '',
          value: '',
        },
      ],
    });
  };

  const removeExtraField = (indexToRemove) => {
    setFormData({
      ...formData,
      extraFields: formData.extraFields.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let listingId = "42";
    let user = "guest";
    let status = "Available";
    console.log("" + user + " created listing with listingId: " + listingId + " and the following formData:");
    console.log(formData);

    let templisting = {
      listingId: "42", //placeholder!
      title: formData.title,
      location: formData.street + "," + formData.city + "," + formData.country + "," + formData.postalCode, //street, city, country, postalCode -- placeholder!
      description: formData.description,
      price: formData.price,
      images: [formData.images],
      seller: 'anonymous', //placeholder!
      status: 'Available'
    };

    dispatch({type: "listings/addListing", payload: templisting});
    setModalVisible(false);
  };

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
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-medium" htmlFor="listing-title-input">Title</label>
                      <input
                        id="listing-title-input"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-street-input">Address</label>
                      <input
                        id="listing-street-input"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        placeholder="Street"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                      <div className="flex flex-wrap -mx-3 my-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="font-medium" htmlFor="listing-city-input">City</label>
                          <input
                            id="listing-city-input"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="font-medium" htmlFor="listing-country-input">Country</label>
                          <input
                            id="listing-country-input"
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="font-medium" htmlFor="listing-postalcode-input">Postal Code</label>
                        <input
                          id="listing-postalcode-input"
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="Postal Code"
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-investmenttype-select">Investment Type</label>
                      <select
                        id="listing-investmenttype-select"
                        name="investmentType"
                        value={formData.investmentType}
                        onChange={handleChange}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="1">House/Living Accomodation</option>
                        <option value="2">Franchise</option>
                        <option value="3">Gas Station</option>
                        <option value="4">Stock Portfolio</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-price-input">Price</label>
                      <input
                        id="listing-price-input"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-description-textarea">Description</label>
                      <textarea
                        id="listing-description-textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      ></textarea>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-images-input">Images</label>
                      <input
                        id="listing-images-input"
                        type="url"
                        name="images"
                        // multiple
                        // accept="image/*"
                        onChange={handleImageUpload}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      {formData.extraFields.map((extraField, index) => (
                        <div className="flex" key={index}>
                          <div className="w-1/2 pr-2">
                            <label className="font-medium" htmlFor={"listing-field-name-input-" + index}>Field Name</label>
                            <input
                              id={"listing-field-name-input-" + index}
                              type="text"
                              name="field-name"
                              value={extraField.name}
                              onChange={(e) => handleExtraFieldChange(e, index)}
                              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                            />
                          </div>
                          <div className="w-1/2 pl-2">
                            <label className="font-medium" htmlFor="listing-field-value">Field Value</label>
                            <input
                              id={"listing-field-name-input-" + index}
                              type="text"
                              name="field-value"
                              value={extraField.value}
                              onChange={(e) => handleExtraFieldChange(e, index)}
                              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExtraField(index)}
                            className="ml-2 mt-8 text-red-500 hover:text-red-700"
                          >
                            <FaMinusCircle />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addExtraField}
                        className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-primary-darkgreen active:bg-primary-green rounded-lg duration-150 mt-4"
                      >
                        + Add new field
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white font-medium bg-primary-green hover:bg-primary-darkgreen active:bg-primary-green rounded-lg duration-150 mt-4"
                    >
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
