const NodeCache = require('node-cache')
const method = require('../constants/method')
const apiResponse = require('../utils/apiResponse')
const APIStatus = require('../constants/APIStatus')
const { StatusCodes } = require('http-status-codes')
const { ttl } = require('../../configs/config')

const myCache = new NodeCache()

const cache = async (req, res, next) => {
  if (req.method !== method.GET) {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(apiResponse({ status: APIStatus.ERROR, msg: 'Cannot cache non-GET method!' }))
  }

  const url = req.originalUrl

  let cachedRespone, key

  if (req.user) {
    const { _id: userId } = JSON.stringify(req.user)
    key = (`${url} ${userId}`)
    cachedRespone = myCache.get(key)
  } else {
    key = (url)
    cachedRespone = myCache.get(key)
  }

  if (!cachedRespone) {
    res.originalSend = res.send
    res.send = body => {
      res.originalSend(body)
      myCache.set(key, body, ttl)
    }
  }

  if (cachedRespone) {
    return res.send(cachedRespone)
  }

  next()
}

module.exports = cache
