const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { adJoiSchema } = require('../../models/ad');
const { ads: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listAds));

router.get('/:adId', ctrlWrapper(ctrl.getAdById));

router.post('/', validation(adJoiSchema), ctrlWrapper(ctrl.addAd));

router.delete('/:adId', ctrlWrapper(ctrl.removeAd));

router.put('/:adId', validation(adJoiSchema), ctrlWrapper(ctrl.updateAd));

module.exports = router;
