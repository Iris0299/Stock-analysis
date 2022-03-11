const mongoose = require('mongoose')

const { mongodbUri } = require('../../configs/config')

mongoose.connect(mongodbUri).catch((error) => console.log(error.message))

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error')
  console.log(JSON.stringify(error))
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connection connect successfully')
})
