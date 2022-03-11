const { StatusCodes } = require('http-status-codes')
const { pagination } = require('../../configs/config')

const APIStatus = require('../constants/APIStatus')
const { getStockByCodeDb } = require('../db/stock.db')
const apiResponse = require('../utils/apiResponse')

const {
  getGroupDb,
  createGroupDb,
  addStockToGroupDb,
  removeStockFromGroupDb,
  deleteGroupDb
} = require('../db/group.db')

const createGroup = async (req, res) => {
  const { _id: userId } = req.user
  const { groupName } = req.body

  const rs = await createGroupDb(userId, groupName)

  if (!rs) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Cannot create new group'
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

const getGroup = async (req, res) => {
  const { _id: userId } = req.user

  const { groupId, records, page } = req.query

  const query = {
    page: page || pagination.page,
    records: records || pagination.records,
    groupId
  }

  const rs = await getGroupDb(query, userId)

  return res.status(StatusCodes.OK).json(
    apiResponse(
      {
        status: APIStatus.SUCCESS,
        data: rs
      }
    )
  )
}

const addStockToGroup = async (req, res) => {
  const { _id: userId } = req.user
  const { groupId } = req.params
  const { stockCode } = req.body

  const stock = await getStockByCodeDb(stockCode)
  if (!stock) {
    return res.status(StatusCodes.NOT_FOUND).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'This stock code does not exist'
      })
    )
  }

  const rs = await addStockToGroupDb(userId, groupId, stockCode)

  if (!rs) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Cannot add stock to group'
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

const removeStockFromGroup = async (req, res) => {
  const { groupId } = req.params
  const { stockCode } = req.body

  if (!stockCode) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Please enter stockCode'
      })
    )
  }

  const rs = await removeStockFromGroupDb(groupId, stockCode)

  return res.status(StatusCodes.OK).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: 'Delete stock from group successfully',
      data: {
        rs
      }
    })
  )
}

const deleteGroup = async (req, res) => {
  const { groupId } = req.body

  if (!groupId) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: 'Please enter groupId'
      })
    )
  }

  const rs = await deleteGroupDb(groupId)

  return res.status(StatusCodes.OK).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: 'Delete group successfully',
      data: {
        rs
      }
    })
  )
}

module.exports = {
  getGroup,
  createGroup,
  addStockToGroup,
  removeStockFromGroup,
  deleteGroup
}
