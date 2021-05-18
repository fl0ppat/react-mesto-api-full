const mongoose = require('mongoose');
const validator = require('validator');

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return validator.isURL(link, { require_protocol: true });
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardsSchema);
