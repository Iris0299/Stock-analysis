const express = require('express')
const { ValidationError } = require('express-validation')

const APIStatus = require('./src/api/constants/APIStatus')
const { port } = require('./src/configs/config')
const userRouter = require('./src/api/routes/user.route')
const stockRouter = require('./src/api/routes/stock.route')
const groupRouter = require('./src/api/routes/group.route')
const apiResponse = require('./src/api/utils/apiResponse')

require('./src/api/db/mongoose')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)
app.use('/api/stocks', stockRouter)
app.use('/api/groups', groupRouter)

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'validation failed',
        data: { details: err.details }
      })
    )
  }

  return res
    .status(500)
    .json(
      apiResponse({ status: APIStatus.ERROR, msg: 'Internal Server error', data: { err } })
    )
})

app.listen(port, () => {
  console.log(`Server is lisening on port ${port}`)
})

module.exports = app
