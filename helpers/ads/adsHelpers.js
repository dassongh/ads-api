const { Ad } = require('../../models/ad');
const mongoose = require('mongoose');

const listAds = async (name, page, limit, sort) => {
  const skip = (page - 1) * limit;
  const searchQuery = {};

  if (name) searchQuery.name = name;

  return await Ad.find(searchQuery)
    .skip(skip)
    .limit(Number(limit))
    .sort(sort)
    .select({ name: 1, images: { $slice: 1 }, price: 1 });
};

const getAdById = async (adId, fields) => {
  const isIDValid = mongoose.Types.ObjectId.isValid(adId);

  if (!isIDValid) throw new Error('Not a valid ID');

  const selectedValues = {
    name: 1,
    images: fields.includes('images') ? 1 : { $slice: 1 },
    price: 1,
  };

  if (fields.includes('description')) selectedValues.description = 1;

  return await Ad.findById(adId).select(selectedValues);
};

const addAd = async body => {
  return await Ad.create({ ...body });
};

const removeAd = async adId => {
  const isIDValid = mongoose.Types.ObjectId.isValid(adId);

  if (!isIDValid) throw new Error('Not a valid ID');

  return await Ad.findByIdAndRemove(adId);
};

const updateAd = async (adId, body) => {
  const isIDValid = mongoose.Types.ObjectId.isValid(adId);

  if (!isIDValid) throw new Error('Not a valid ID');

  return await Ad.findByIdAndUpdate(adId, body, { new: true });
};

module.exports = { listAds, getAdById, addAd, removeAd, updateAd };
