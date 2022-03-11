const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')

const APIStatus = require('../constants/APIStatus')
const { getUser, createUser } = require('../db/user.db')
const apiResponse = require('../utils/apiResponse')

const login = async (req, res) => {
  const { username, password } = req.body

  const user = await getUser({ username })
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Username or password wrong'
      })
    )
    return
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = user.createToken()
      res
        .status(200)
        .json(
          apiResponse({ status: APIStatus.SUCCESS, msg: '', data: { token } })
        )
    } else if (!err) {
      res.status(StatusCodes.BAD_REQUEST).json(
        apiResponse({
          status: APIStatus.FAIL,
          msg: 'Username or password wrong'
        })
      )
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          apiResponse({ status: APIStatus.ERROR, msg: 'Internal server error' })
        )
    }
  })
}

const signup = async (req, res) => {
  const { email, username, password } = req.body

  const [checkUsername, checkEmail] = await Promise.all([
    getUser({ username }),
    getUser({ email })
  ])

  if (checkUsername) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(apiResponse({ status: APIStatus.FAIL, msg: 'Username existed' }))
  }
  if (checkEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(apiResponse({ status: APIStatus.FAIL, msg: 'Email existed' }))
  }

  const user = await createUser(username, email, password)
  const token = user.createToken()

  res.status(201).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: 'create new user successfully',
      data: { token }
    })
  )
}

const getInfo = async (req, res) => {
  res
    .status(200)
    .json(apiResponse({ status: APIStatus.SUCCESS, data: { info: req.user } }))
}

module.exports = {
  login,
  signup,
  getInfo
}
