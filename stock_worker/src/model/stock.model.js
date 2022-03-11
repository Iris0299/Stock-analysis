const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  code: {
    type: String
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
    type: String
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
  delta: {
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
    type: String
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
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Stock', stockSchema)
