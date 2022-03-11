require('dotenv-safe').config()

module.exports = {
  mongodbUri: process.env.MONGODB_URI,
  url: process.env.URL,
  time1: '*/900 * 9-10,13 * * 1-5',
  time2: '*/900 * 11-22 * * 1-5',
  // time3: '*/900 0-45 14 * * 1-5'
  time3: '*/1 * * * * 1-5'
}
