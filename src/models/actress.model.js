import mongoose from 'mongoose';

const actressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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

export const ActressModel = mongoose.model('actress', actressSchema, 'actress');