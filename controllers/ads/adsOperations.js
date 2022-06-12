const { NotFound } = require('http-errors');
const adsHelpers = require('../../helpers');

const listAds = async (req, res) => {
  const { name = null, page = 1, limit = 10, sort = '' } = req.query;
  const ads = await adsHelpers.listAds(name, page, limit, sort.toLowerCase());

  if (ads.length === 0 && name)
    throw new NotFound(`There is no ads with name ${name}. You need to provide the exact name value`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: ads,
    },
  });
};

const getAdById = async (req, res) => {
  const { adId } = req.params;
  const { fields = '' } = req.query;

  const result = await adsHelpers.getAdById(adId, fields.toLowerCase());

  if (!result) throw new NotFound(`There is no ad with id ${adId}`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const addAd = async (req, res) => {
  const result = await adsHelpers.addAd(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const removeAd = async (req, res) => {
  const { adId } = req.params;
  const result = await adsHelpers.removeAd(adId);

  if (!result) throw new NotFound(`There is no ad with id ${adId}`);

  res.json({
    status: 'success',
    code: 200,
    message: 'Ad successfully removed',
    data: {
      result,
    },
  });
};

const updateAd = async (req, res) => {
  const { adId } = req.params;
  const result = await adsHelpers.updateAd(adId, req.body);

  if (!result) throw new NotFound(`There is no ad with id ${adId}`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listAds,
  getAdById,
  addAd,
  removeAd,
  updateAd,
};
