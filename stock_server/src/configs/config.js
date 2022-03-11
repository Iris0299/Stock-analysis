require('dotenv-safe').config()

const nodeEnv = process.env.NODE_ENV
const port = process.env.PORT
const jwtKey = process.env.JWT_KEY
const mongodbUri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
const ttl = 30 // time to live = 30s
module.exports = {
  pagination: {
    page: 1,
    records: 407
  },
  nodeEnv,
  port,
  mongodbUri,
  jwtKey,
  ttl
}
