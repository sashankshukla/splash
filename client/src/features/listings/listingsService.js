import axios from 'axios';

const API_URL = 'http://localhost:5001/listings/';

console.log(listingFilter);
  //check for and collect info for each filter param
  //encode the URI Components for each aspect

  let max = 1000000000;
  let query = [];

  if(listingFilter.keywordSearch !== "") {
    query.push("\"$text\":{\"$search\":\"" + listingFilter.keywordSearch + "\"}");
  }

  if(listingFilter.price.lower > 0 && listingFilter.price.upper < max) {
    query.push("\"price\":{\"$and\":[{\"$gte\":" + listingFilter.price.lower + "},{\"$lte:\"" + listingFilter.price.upper + "}]}");
  } else if(listingFilter.price.lower > 0) {
    query.push("\"price\":{\"$gte\":" + listingFilter.price.lower + "}");
  } else if(listingFilter.price.upper < max) {
    query.push("\"price\":{\"$lte\":" + listingFilter.price.upper + "}");
  }

  //distance
  // if(listingFilter.distance.check) {
  //   query.push("\"distance\":{\"$lte\":" + listingFilter.distance.range + "}");
  // }
  //NO DISTANCE OBJBECT, NEED TO DO MATH WITH LOCATION -- SAVE FOR LATER

  //status
  if(listingFilter.status.available && listingFilter.status.sold) {
    query.push("\"status\":{\"$in\":[\"Available\",\"Sold\"]}");
  } else if(listingFilter.status.available) {
    query.push("\"status\": \"Available\"");
  } else if(listingFilter.status.sold) {
    query.push("\"status\": \"Sold\"");
  }

  //investmentType
  let invT = ""
  let invTEnd = "";
  if(listingFilter.investmentType.residence ||
    listingFilter.investmentType.franchise ||
    listingFilter.investmentType.gasStation ||
    listingFilter.investmentType.stockPortfolio) {
      
      invT="\"investmentType\":{\"\`$in\`\":[";
      invTEnd = "]}"
  }
  if(listingFilter.investmentType.residence) {
    invT = invT.concat("\"House/Living Accommodation\"");
    if(listingFilter.investmentType.franchise || listingFilter.investmentType.gasStation || listingFilter.investmentType.stockPortfolio) {
      invT = invT.concat(",");
    }
  }
  if(listingFilter.investmentType.franchise) {
    invT = invT.concat("\"Franchise\"");
    if(listingFilter.investmentType.gasStation || listingFilter.investmentType.stockPortfolio) {
      invT = invT.concat(",");
    }
  }
  if(listingFilter.investmentType.gasStation) {
    invT = invT.concat("\"Gas Station\"");
    if(listingFilter.investmentType.stockPortfolio) {
      invT = invT.concat(",");
    }
  }
  if(listingFilter.investmentType.stockPortfolio) {
    invT = invT.concat("\"Stock Portfolio\"");
  }
  invT = invT.concat(invTEnd);
  query.push(invT);

  // if(listingFilter.sortTime == "Newest First") {
  //   //
  // } else if (listingFilter.sortTime == "Oldest First") {
  //   //
  // }

  // if(listingFilter.sortPrice == "Low to High") {
  //   //
  // } else if (listingFilter.sortTime == "High to Low") {
  //   //
  // }

  // let queryStr = "";

  // for(let i = 0; i < query.length; i++) {
  //   queryStr = queryStr + query[i];

  //   if(i < query.length - 1) {
  //     queryStr = queryStr + ",";
  //   }
  // }

  // const queryStrEncoded = encodeURIComponent(queryStr);

  // const config = {
  //   headers: {
  //     query: queryStrEncoded,
  //     'Content-Type': 'multipart/form-data',
  //   },
  // };

  // let keywordSearch = "";
  // let sortTime = "";
  // let sortPrice = "";
  // let lowerPrice = "";
  // let upperPrice = "";
  // let distLimit = "";
  // let statAvail = "";
  // let statSold = "";
  // let investHouse = "";
  // let investFranchise = "";
  // let investGas = "";
  // let investStock = "";

  // if(listingFilter.keywordSearch != "") {
  //   keywordSearch = "keywordSearch=" + listingFilter.keywordSearch;

  //   //price.lower if it isn't first in query
  //   lowerPrice = "&lowerPrice=" + listingFilter.price.lower.toString();
  // } else {
  //   //price.lower if it is first in query
  //   lowerPrice = "lowerPrice=" + listingFilter.price.lower.toString();
  // }
  
  // //price.upper
  // upperPrice = "&upperPrice=" + listingFilter.price.lower.toString();

  // //distance
  // if(listingFilter.distance.check) {
  //   distLimit = "&distLimit=" + listingFilter.distance.range;
  // }

  // //status
  // if(listingFilter.status.available) {
  //   statAvail = "&statAvail=";
  // }
  // if(listingFilter.status.sold) {
  //   statSold = "&statSold=";
  // }

  // //investmentType
  // if(listingFilter.investmentType.residence) {
  //   investHouse = "&investHouse=";
  // }
  // if(listingFilter.investmentType.franchise) {
  //   investFranchise = "&investFranchise=";
  // }
  // if(listingFilter.investmentType.gasStation) {
  //   investGas = "&investGas=";
  // }
  // if(listingFilter.investmentType.stockPortfolio) {
  //   investStock = "&investStock=";
  // }

  // if(listingFilter.sortTime == "Newest First") {
  //   sortTime = "&sortTime=n";
  // } else if (listingFilter.sortTime == "Oldest First") {
  //   sortTime = "&sortTime=o";
  // }

  // if(listingFilter.sortPrice == "Low to High") {
  //   sortPrice = "&sortPrice=l";
  // } else if (listingFilter.sortTime == "High to Low") {
  //   sortPrice = "&sortPrice=h";
  // }

  //keywordSearch
  //sortTime replace with string
  //sortPrice
  //lowerPrice --> price.lower
  //upperPrice --> price.upper
  //distLimit --> distance.limit (check value of distance.check first)
  //statAvail --> status.available
  //statSold --> status.sold
  //investHouse --> investmentType.residence
  //investFranchise --> investmentType.Franchise
  //investGas --> investmentType.gasStation
  //investStock --> investmentType.stockPortfolio

  // const response = await axios.get(API_URL + queryStrEncoded);
  // return response.data;

const fetchListings = async (listingFilter) => {
  console.log(listingFilter);
  //check for and collect info for each filter param
  //encode the URI Components for each aspect

  let query = encodeURIComponent(JSON.stringify(listingFilter));

  const response = await axios.get(API_URL+query);
  return response.data;
};

const addListing = async (listingData, token) => {
  const formData = new FormData();

  //template literals require backticks like `` instead of regular apostrophes like ''
  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  for (const key in listingData) {
    if (key === 'images') {
      listingData[key].forEach((image, index) => {
        formData.append(`images`, image);
      });
    } else if (key === 'address' || key === 'details') {
      formData.append(key, JSON.stringify(listingData[key]));
    } else {
      formData.append(key, listingData[key]);
    }
  }

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

const updateListing = async (listingData, listingId, token) => {
  const formData = new FormData();

  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  for (const key in listingData) {
    if (key === 'images') {
      listingData[key].forEach((image, index) => {
        formData.append(`images`, image);
      });
    } else if (key === 'address' || key === 'details') {
      formData.append(key, JSON.stringify(listingData[key]));
    } else {
      formData.append(key, listingData[key]);
    }
  }

  const response = await axios.put(`${API_URL}${listingId}`, formData, config);
  return response.data;
};

const deleteListing = async (id, token) => {
  // console.log(token);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const sellListing = async (listingId, poolId, token) => {
  console.log('token', token);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  console.log(config);
  const response = await axios.post(`${API_URL}sell/${listingId}/${poolId}`, {}, config);
  return response.data;
};

const listingsService = {
  fetchListings,
  addListing,
  deleteListing,
  updateListing,
  sellListing,
};

export default listingsService;
