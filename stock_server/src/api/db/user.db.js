const mongoose = require('mongoose')

const User = require('../models/user.model')

const getUser = async (filter) => {
  const user = await User.findOne(filter)

  return user
}

// get user info without password
const getUserInfo = async (filter) => {
  if (filter._id) {
    filter._id = mongoose.Types.ObjectId(filter._id)
  }

  const users = await User.aggregate([
    { $match: filter },
    { $project: { password: 0 } }
  ])

  return users[0]
}

const createUser = async (username, email, password) => {
  const user = await new User({ username, email, password }).save()

  return user
}

module.exports = {
  getUser,
  getUserInfo,
  createUser
}
