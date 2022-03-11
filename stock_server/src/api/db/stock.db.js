const Stock = require('../models/stock.model')

const getStockByCodeDb = async (code) => {
  const stock = await Stock.find({ code }, { _id: false })
  return stock
}

const getStockDb = async (query) => {
  const { page, records, filter } = query

  const [totalRecords, stocks] = await Promise.all([Stock.find(filter).count(),
    Stock.find(filter, { _id: false })
      .skip((page - 1) * records)
      .limit(records)
  ])

  return {
    stocks,
    totalRecords
  }
}

module.exports = {
  getStockByCodeDb,
  getStockDb
}
