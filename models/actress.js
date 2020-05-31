const mongoose = require('mongoose')

const actressSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: String,
    required: false
  },
  placeOfBirth: {
    type: String,
    required: false
  },
  debut: {
    type: String,
    required: false
  },
  yearsActive: {
    type: String,
    required: false
  },
  measurements: {
    type: String,
    required: false
  },
  cup: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  },
  starSign: {
    type: String,
    required: false
  },
  bloodType: {
    type: String,
    required: false
  },
  films: {
    type: Array,
    required: false
  }
})

exports.Actress = mongoose.model('actress', actressSchema, 'actress')