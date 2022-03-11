const Group = require('../models/group.model')

const getGroupDb = async (query, userId) => {
  const { groupId, page, records } = query

  if (groupId) {
    const groups = await Group.findById(groupId)

    return { groups }
  }

  if (!groupId) {
    const [totalRecords, groups] = await Promise.all([
      Group.find({ userId }, { userId: false }).count(),
      Group.find({ userId }, { userId: false })
        .skip((page - 1) * records)
        .limit(records)
    ])

    return {
      groups,
      totalRecords
    }
  }
}

const createGroupDb = async (userId, groupName) => {
  const newGroup = new Group({ userId, groupName })
  const rs = await newGroup.save()

  return rs
}

const addStockToGroupDb = async (userId, groupId, stock) => {
  const groups = await Group.findOne({ _id: groupId, userId }, { userId: false })

  if (!groups) return null

  const listStock = groups.stockCode
  const addStock = new Set(listStock.concat(stock))
  groups.stockCode = Array.from(addStock)

  const rs = await groups.save()

  return rs
}

const removeStockFromGroupDb = async (groupId, stock) => {
  const groups = await Group.findById(groupId)

  const listStock = groups.stockCode
  const newlistStock = listStock.filter((x) => (x !== stock))

  const rs = await Group.updateOne(
    { _id: groupId },
    { stockCode: newlistStock }
  )

  return rs
}

const deleteGroupDb = async (groupId) => {
  const rs = await Group.findByIdAndRemove({ _id: groupId })
  return rs
}

module.exports = {
  getGroupDb,
  createGroupDb,
  addStockToGroupDb,
  removeStockFromGroupDb,
  deleteGroupDb
}
