import React, { useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addListing, updateListing } from '../../features/listings/listingsSlice';
import SuccessAlert from '../Accessories/SuccessAlert/SuccessAlert';
import ErrorAlert from '../Accessories/ErrorAlert/ErrorAlert';

const ListingForm = ({ formVisible, setFormVisible, isEditing, listingId, setSelectedListing }) => {
  const dispatch = useDispatch();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: '',
    },
    description: '',
    details: [],
    price: '',
    images: [],
    investmentType: '',
  });

  if (!formVisible) return null;

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleImageUpload = (e) => {
    let imageFiles = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: imageFiles,
    });
  };

  const handleExtraFieldChange = (e, index) => {
    const newDetails = formData.details;
    newDetails[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      details: newDetails,
    });
  };

  const addExtraField = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
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
      details: formData.details.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateListing({ formData, listingId }))
        .then((response) => {
          setIsSuccessModalOpen(true);
          setTimeout(() => {
            setIsSuccessModalOpen(false);
            setFormVisible(false);
            setSelectedListing(null);
          }, 2000);
        })
        .catch((error) => {
          if (error) {
            setIsErrorModalOpen(error.message);
            setTimeout(() => {
              setIsErrorModalOpen(null);
              setSelectedListing(null);
            }, 2000);
          }
        });
    } else {
      dispatch(addListing(formData))
        .then((response) => {
          setIsSuccessModalOpen(true);
          setTimeout(() => {
            setIsSuccessModalOpen(false);
            setFormVisible(false);
            setSelectedListing(null);
          }, 2000);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            setIsErrorModalOpen(error.message);
            setTimeout(() => {
              setIsErrorModalOpen(null);
              setSelectedListing(null);
            }, 2000);
          }
        });
    }
  };

  return (
    <main className="py-14 mx-8">
      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4">
          <div className="relative bg-white rounded-md text-gray-600 overflow-y-auto max-h-screen">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleFormVisibility}
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
                      <label className="font-medium" htmlFor="listing-title-input">
                        Title
                      </label>
                      <input
                        id="listing-title-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-street-input">
                        Address
                      </label>
                      <input
                        id="listing-street-input"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleAddressChange}
                        required
                        placeholder="Street"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                      <div className="flex flex-wrap -mx-3 my-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="font-medium" htmlFor="listing-city-input">
                            City
                          </label>
                          <input
                            id="listing-city-input"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="font-medium" htmlFor="listing-country-input">
                            Country
                          </label>
                          <input
                            id="listing-country-input"
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleAddressChange}
                            placeholder="Country"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="font-medium" htmlFor="listing-postalcode-input">
                          Postal Code
                        </label>
                        <input
                          id="listing-postalcode-input"
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleAddressChange}
                          required
                          placeholder="Postal Code"
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-investmenttype-select">
                        Investment Type
                      </label>
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
                        <option value="Housing/Living Accommodation">
                          House/Living Accomodation
                        </option>
                        <option value="Franchise">Franchise</option>
                        <option value="Gas Station">Gas Station</option>
                        <option value="Stock Portfolio">Stock Portfolio</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="listing-price-input">
                        Price
                      </label>
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
                      <label className="font-medium" htmlFor="listing-description-textarea">
                        Description
                      </label>
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
                      <label className="font-medium" htmlFor="listing-images-input">
                        Images
                      </label>
                      <input
                        id="listing-images-input"
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                      />
                    </div>

                    <div>
                      {formData.details.map((extraField, index) => (
                        <div className="flex" key={index}>
                          <div className="w-1/2 pr-2">
                            <label
                              className="font-medium"
                              htmlFor={'listing-field-name-input-' + index}
                            >
                              Field Name
                            </label>
                            <input
                              id={'listing-field-name-input-' + index}
                              type="text"
                              name="name"
                              value={extraField.name}
                              onChange={(e) => handleExtraFieldChange(e, index)}
                              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-green shadow-sm rounded-lg"
                            />
                          </div>
                          <div className="w-1/2 pl-2">
                            <label className="font-medium" htmlFor="listing-field-value">
                              Field Value
                            </label>
                            <input
                              id={'listing-field-name-input-' + index}
                              type="text"
                              name="value"
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
                      {isEditing ? 'Update Listing' : 'Create Listing'}
                    </button>
                  </form>
                </div>
                {isErrorModalOpen && <ErrorAlert message={isErrorModalOpen} />}
                {isSuccessModalOpen && (
                  <SuccessAlert message={'New Listing Created! Good Luck!.'} />
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </main>
  );
};

export default ListingForm;
