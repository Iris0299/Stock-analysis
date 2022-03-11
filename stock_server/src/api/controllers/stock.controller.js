const { StatusCodes } = require('http-status-codes')
const { pagination } = require('../../configs/config')

const APIStatus = require('../constants/APIStatus')
const { getStockDb, getStockByCodeDb } = require('../db/stock.db')
const apiResponse = require('../utils/apiResponse')

const getAllStocks = async (req, res, next) => {
  const { page, ...filter } = req.query

  const query = {
    page: page || pagination.page,
    records: pagination.records,
    filter
  }

  const rs = await getStockDb(query)

  if (rs.totalRecords > 0) {
    return res
      .status(StatusCodes.OK)
      .json(apiResponse({ status: APIStatus.SUCCESS, data: { stocks: rs.stocks, totalRecords: rs.totalRecords } }))
  } else {
    return res
      .status(StatusCodes.OK)
      .json(apiResponse({ status: APIStatus.SUCCESS, msg: 'There is no data' }))
  }
}

const getStock = async (req, res, next) => {
  const { stockCode } = req.params

  const stock = await getStockByCodeDb(stockCode)

  if (stock) {
    return res
      .status(StatusCodes.OK)
      .json(apiResponse({ status: APIStatus.SUCCESS, data: { stock } }))
  } else {
    return res.status(StatusCodes.NOT_FOUND).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'This stock code does not exist'
      })
    )
  }
}

module.exports = {
  getAllStocks,
  getStock
}
