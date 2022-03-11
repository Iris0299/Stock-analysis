const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const expectedSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  stockCode: {
    type: String
  },
  value: {
    type: Number
  }
})

expectedSchema.index({ userId: 1, stockCode: 1 }, { unique: true })

module.exports = mongoose.model('Expected', expectedSchema)
