const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const { jwtKey } = require('../../configs/config')
const { getUserInfo } = require('../db/user.db')
const apiResponse = require('../utils/apiResponse')
const APIStatus = require('../constants/APIStatus')

const decodeUserToken = async (token) => {
  try {
    const decode = jwt.verify(token, jwtKey)
    const user = await getUserInfo({ _id: decode._id })

    return user
  } catch (error) {
    return null
  }
}

const auth = async (req, res, next) => {
  const originalToken =
    req.header('Authorization') || req.header('x-access-token')
  if (!originalToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        apiResponse({ status: APIStatus.FAIL, msg: 'You dont have permission' })
      )
  }

  const token = originalToken.replace('Bearer', '')
  const user = await decodeUserToken(token)
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(apiResponse({ status: APIStatus.FAIL, msg: 'Invalid token' }))
  }

  req.user = user

  next()
}

module.exports = {
  auth
}
