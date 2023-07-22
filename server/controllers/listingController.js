const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Pool = require('../models/poolModel');
const data = require('./initalData.js');
const mongoose = require('mongoose');

// function processListings() {
//   data.initToronto.forEach((jsonObject) => {
//     console.log(jsonObject.streetAddress);
//     Listing.create({
//       name: jsonObject.streetAddress,
//       address: {
//         street: jsonObject.streetAddress,
//         city: 'Toronto',
//         country: 'Canada',
//         postalCode: jsonObject.zipcode,
//       },
//       description: `This property at ${jsonObject.streetAddress} has ${jsonObject.bathrooms} bathrooms, ${jsonObject.bedrooms} bedrooms and is ${jsonObject.lotAreaValue} square feet.`,
//       investmentType: 'Housing/Living Accommodation',
//       details: [],
//       price: jsonObject.price,
//       images: [`${jsonObject.imgSrc}`],
//       status: 'Available',
//       createdBy: 'he.frankey@gmail.com',
//     });
//   });
// }

// const getListings = async (req, res) => {
  // if(req.params.keyword) {
  //   //
  // }

  // if(req.params.sortTime) {
  //   //
  // }

  // if(req.params.sortPrice) {
  //   //
  // }

  // if(req.params.lowerPrice) {
  //   //
  // }

  // if(req.params.upperPrice) {
  //   //
  // }

  // if(req.params.distLimit) {
  //   //
  // }

  // if(req.params.statAvail) {
  //   //
  // }

  // if(req.params.statSold) {
  //   //
  // }

  // if(req.params.investHouse) {
  //   //
  // }

  // if(req.params.investFranchise) {
  //   //
  // }

  // if(req.params.investGas) {
  //   //
  // }

  // if(req.params.investStock) {
  //   //
  // }

//   const listings = await Listing.find({ status: 'Available' });
//   res.status(200).json(listings);
// };

  // if(listingFilter.price.lower > 0 && listingFilter.price.upper < max) {
  //   query.push("\"price\":{\"$and\":[{\"$gte\":" + listingFilter.price.lower + "},{\"$lte:\"" + listingFilter.price.upper + "}]}");
  // } else if(listingFilter.price.lower > 0) {
  //   query.push("\"price\":{\"$gte\":" + listingFilter.price.lower + "}");
  // } else if(listingFilter.price.upper < max) {
  //   query.push("\"price\":{\"$lte\":" + listingFilter.price.upper + "}");
  // }

  //distance
  // if(listingFilter.distance.check) {
  //   query.push("\"distance\":{\"$lte\":" + listingFilter.distance.range + "}");
  // }
  //NO DISTANCE OBJBECT, NEED TO DO MATH WITH LOCATION -- SAVE FOR LATER

  //status
  // if(listingFilter.status.available && listingFilter.status.sold) {
  //   query.push("\"status\":{\"$in\":[\"Available\",\"Sold\"]}");
  // } else if(listingFilter.status.available) {
  //   query.push("\"status\": \"Available\"");
  // } else if(listingFilter.status.sold) {
  //   query.push("\"status\": \"Sold\"");
  // }

  //investmentType
  // let invT = ""
  // let invTEnd = "";
  // if(listingFilter.investmentType.residence ||
  //   listingFilter.investmentType.franchise ||
  //   listingFilter.investmentType.gasStation ||
  //   listingFilter.investmentType.stockPortfolio) {
      
  //     invT="\"investmentType\":{\"\`$in\`\":[";
  //     invTEnd = "]}"
  // }
  // if(listingFilter.investmentType.residence) {
  //   invT = invT.concat("\"House/Living Accommodation\"");
  //   if(listingFilter.investmentType.franchise || listingFilter.investmentType.gasStation || listingFilter.investmentType.stockPortfolio) {
  //     invT = invT.concat(",");
  //   }
  // }
  // if(listingFilter.investmentType.franchise) {
  //   invT = invT.concat("\"Franchise\"");
  //   if(listingFilter.investmentType.gasStation || listingFilter.investmentType.stockPortfolio) {
  //     invT = invT.concat(",");
  //   }
  // }
  // if(listingFilter.investmentType.gasStation) {
  //   invT = invT.concat("\"Gas Station\"");
  //   if(listingFilter.investmentType.stockPortfolio) {
  //     invT = invT.concat(",");
  //   }
  // }
  // if(listingFilter.investmentType.stockPortfolio) {
  //   invT = invT.concat("\"Stock Portfolio\"");
  // }
  // invT = invT.concat(invTEnd);
  // query.push(invT);

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


const getListings = async (req, res) => {
  //console.log("req.params.query: " + req.params.query);
  let max = 1000000000;
  let queryDecoded = "";
  let filterObj = {};
  let sortObj = {};

  if(req.params.query) {
    queryDecoded = JSON.parse(decodeURIComponent(req.params.query));
    //console.log("queryDecoded: " + queryDecoded + " END");
  } else {
    //console.log("Issue retreiving query");
  }

  // !! FIND OBJ !!
  let filterArr = [];
  // keyword
  if(queryDecoded.keywordSearch !== "") {
    filterArr.push({"$text": {"$search": queryDecoded.keywordSearch}});
    //filterObj.$text = {$search: queryDecoded.keywordSearch};
  }

  // price
  if(queryDecoded.price.lower > 0 && queryDecoded.price.upper < max) {
    filterArr.push({"price": {"$and": [{"$gte": Number(queryDecoded.price.lower)}, {"$lte": Number(queryDecoded.price.upper)}]}});
    //filterObj.price = {$and: [{$gte: queryDecoded.price.lower}, {$lte: queryDecoded.price.upper}]};
  } else if(queryDecoded.price.lower > 0) {
    filterArr.push({"price": {"$gte": Number(queryDecoded.price.lower)}});
    //filterObj.price = {$gte: queryDecoded.price.lower};
  } else if(queryDecoded.price.upper < max) {
    filterArr.push({"price": {"$lte": Number(queryDecoded.price.upper)}});
    //filterObj.price = {$lte: queryDecoded.price.upper};
  }

  //status
  let statArr = [];
  if(queryDecoded.status.available) {
    statArr.push('Available');
  }
  if(queryDecoded.status.sold) {
    statArr.push('Sold');
  }

  if(statArr.length > 0) {
    if(statArr.length > 1) {
      //both
      filterArr.push({"status": {"$in": statArr}});
      //filterObj.status = {$in: statArr};
    } else {
      //just one
      filterArr.push({"status": statArr[0]});
      //filterObj.status = statArr[0];
    }
  }

  //investmentType
  let investArr = [];
  if(queryDecoded.investmentType.residence) {
    investArr.push('House/Living Accommodation');
  }
  if(queryDecoded.investmentType.franchise) {
    investArr.push('Franchise');
  }
  if(queryDecoded.investmentType.gasStation) {
    investArr.push('Gas Station');
  }
  if(queryDecoded.investmentType.stockPortfolio) {
    investArr.push('Stock Portfolio');
  }

  if(investArr.length > 0) {
    if(investArr.length > 1) {
      //more than one
      filterArr.push({"investmentType": {"$in": investArr}});
      //filterObj.investmentType = {$in: investArr};
    } else {
      //only one
      filterArr.push({"investmentType": investArr[0]});
      //filterObj.investmentType = investArr[0];
    }
  }

  // big catch-all that replaces whole query with null if we have query choices that should cause it
  if((statArr.length > 0 && investArr.length > 0) || filterArr.length == 0) { //remains null
    if(filterArr.length > 1) { //more than one field filtered on
      filterObj = filterArr.reduce((acc, curr, i) => ({ ...acc, [`${Object.keys(curr)[0]}`]: Object.values(curr)[0]}), {});
      // Ref: https://www.appsloveworld.com/nodejs/100/321/how-do-i-add-multiple-optional-parameters-in-express-in-same-route
    } else { //only one field filtered on
      filterObj = filterArr[0];
    }
  } else {
    filterObj = {_id: null}; // should always return an empty array if we've not chosen any of the checkbox fields;
  }
  console.log(filterObj);

  // !! TODO: SORT OBJ !!
  let sortArr = [];
  
  const listings = await Listing.find(filterObj);
  res.status(200).json(listings);
  
};

const getListingsForUser = async (req, res) => {
  const listings = await Listing.find({ createdBy: req.user.email });
  res.status(200).json(listings);
};

const addListing = async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);
  if (!req.body.name || !req.body.address || !req.body.price || !req.user.email) {
    res.status(400);
    throw new Error('Please specify a name, address, price, and email');
  }

  const images = req.files.map((file) => file.location); // Retrieve the file paths of all the uploaded images

  const listing = await Listing.create({
    ...req.body,
    images,
    createdBy: req.user.email,
  });
  res.status(200).json(listing);
};

const updateListing = async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('listing not found');
  }

  const images = req.files.map((file) => file.location); // Retrieve the file paths of all the uploaded images

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images },
    {
      new: true,
    },
  );
  res.status(200).json(updatedListing);
};

const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  await Listing.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
};

const sellListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  const pool = await Pool.findById(req.params.poolId);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  if (pool.listingId.toString() !== listing.id) {
    res.status(400);
    throw new Error('Pool does not own this listing');
  }
  const members = pool.users;
  members.forEach(async (member) => {
    const user = await User.findOne({ email: member.email });
    if (user.funds < member.equity)
      throw new Error('User does not have enough funds to purchase this listing');
    user.ownerships = [
      ...user.ownerships,
      { listingId: new mongoose.Types.ObjectId(listing.id), amount: member.equity },
    ];
    user.funds -= member.equity;
    await user.save();
  });
  listing.status = 'Sold';
  await listing.save();
  const user = req.user;
  user.funds += listing.price;
  await user.save();
  await Pool.deleteOne({ _id: req.params.poolId });
  res.status(200).json(listing);
};

// TODO : Filtering listings

module.exports = {
  getListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
};
