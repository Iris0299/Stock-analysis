const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const groupSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  stockCode: [{
    type: String,
    require: true,
    ref: 'Stock'
  }],
  groupName: {
    type: String
  }
},
{
  timestamps: true
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
