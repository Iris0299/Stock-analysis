const Expected = require('../models/expected.model')

const getExpectedDb = async (userId, stockCode) => {
  const expected = await Expected.findOne({ userId, stockCode }, { _id: false })
  return expected
}

const createExpectedDb = async (userId, stockCode, value) => {
  const newExpected = new Expected({ userId, stockCode, value })

  const rs = await newExpected.save()
  return rs
}

const updateExpectedDb = async (userId, stockCode, newValue) => {
  const expected = await Expected.findOne({ userId, stockCode })

  if (!expected) return null

  expected.value = newValue

  const rs = await expected.save()
  return rs
}

const deleteExpectedDb = async (userId, stockCode) => {
  const rs = await Expected.findOneAndRemove({ userId, stockCode })

  return rs
}

module.exports = {
  getExpectedDb,
  createExpectedDb,
  updateExpectedDb,
  deleteExpectedDb
}
