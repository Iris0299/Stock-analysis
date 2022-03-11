const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: Date
  },
  refPrice: {
    type: Number
  },
  ceil: {
    type: Number
  },
  floor: {
    type: Number
  },
  salePrice1: {
    type: Number
  },
  saleVol1: {
    type: Number
  },
  salePrice2: {
    type: Number
  },
  saleVol2: {
    type: Number
  },
  salePrice3: {
    type: Number
  },
  saleVol3: {
    type: Number
  },
  price: {
    type: Number
  },
  volumn: {
    type: Number
  },
  totalVol: {
    type: Number
  },
  high: {
    type: Number
  },
  low: {
    type: Number
  },
  buyPrice1: {
    type: Number
  },
  buyVol1: {
    type: Number
  },
  buyPrice2: {
    type: Number
  },
  buyVol2: {
    type: Number
  },
  buyPrice3: {
    type: Number
  },
  buyVol3: {
    type: Number
  }
})

module.exports = mongoose.model('Stock', stockSchema)
