const { Schema, model } = require('mongoose');
const Joi = require('joi');

const imageSchema = Schema({
  path: {
    type: 'string',
    required: [true, 'Image should have a path'],
  },
});

const Image = model('image', imageSchema);

const adSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Ad should have a name'],
    },
    description: {
      type: String,
      maxLength: 1000,
    },
    images: [Image.schema],
    price: {
      type: Number,
      required: [true, 'Ad should have a price'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Ad = model('ad', adSchema);

const adJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().max(1000),
  images: Joi.array()
    .items(Joi.object({ path: Joi.string().required() }))
    .max(3),
  price: Joi.number().required(),
});

module.exports = {
  Ad,
  adJoiSchema,
};
