const { StatusCodes } = require('http-status-codes')

const APIStatus = require('../constants/APIStatus')
const {
  getExpectedDb,
  createExpectedDb,
  updateExpectedDb,
  deleteExpectedDb
} = require('../db/expected.db')
const { getStockByCodeDb } = require('../db/stock.db')
const apiResponse = require('../utils/apiResponse')

const getExpectedPrice = async (req, res, next) => {
  const userId = req.user._id
  const { stockCode } = req.params

  const [stock, expected] = await Promise.all([
    getStockByCodeDb(stockCode),
    getExpectedDb(userId, stockCode)
  ])

  if (!stock) {
    return res.status(StatusCodes.NOT_FOUND).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'This stock code does not exist'
      })
    )
  }

  if (!expected) {
    return res.status(StatusCodes.NOT_FOUND).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'This stock does not have expected price yet'
      })
    )
  }

  return res.status(StatusCodes.OK).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      data: {
        stock,
        expectedValue: expected.value
      }
    })
  )
}

const createExpectedPrice = async (req, res, next) => {
  const userId = req.user._id
  const { stockCode } = req.params
  const { value } = req.body

  const [stock, checkExpected] = await Promise.all([
    getStockByCodeDb(stockCode),
    getExpectedDb(userId, stockCode)
  ])

  if (!stock) {
    return res.status(StatusCodes.NOT_FOUND).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'This stock code does not exist'
      })
    )
  }

  if (checkExpected) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'User already have this expected price'
      })
    )
  }

  const rs = await createExpectedDb(userId, stockCode, value)

  if (!rs) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Cannot create new expected price'
      })
    )
  }

  return res.status(StatusCodes.CREATED).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      data: {
        rs
      }
    })
  )
}

const updateExpectedPrice = async (req, res, next) => {
  const userId = req.user._id
  const { stockCode } = req.params
  const { value } = req.body

  const rs = await updateExpectedDb(userId, stockCode, value)

  if (!rs) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Cannot update expected price'
      })
    )
  }

  return res.status(StatusCodes.OK).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: 'Update expected price successfully',
      data: {
        rs
      }
    })
  )
}

const deleteExpectedPrice = async (req, res, next) => {
  const userId = req.user._id
  const { stockCode } = req.params

  const rs = await deleteExpectedDb(userId, stockCode)

  if (!rs) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Cannot delete expected price'
      })
    )
  }

  return res.status(StatusCodes.OK).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: 'Delete expected price successfully',
      data: {
        rs
      }
    })
  )
}

module.exports = {
  getExpectedPrice,
  createExpectedPrice,
  updateExpectedPrice,
  deleteExpectedPrice
}
