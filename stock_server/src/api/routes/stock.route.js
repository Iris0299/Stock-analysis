const express = require('express')
const { validate } = require('express-validation')

const asyncWrap = require('../middlewares/asyncWrap')
const cache = require('../middlewares/nodeCache')
const { auth } = require('../middlewares/auth.middleware')
const { getAllStocks, getStock } = require('../controllers/stock.controller')
const { getExpectedPrice, createExpectedPrice, updateExpectedPrice, deleteExpectedPrice } = require('../controllers/expected.controller')
const { createExpectedValidation, updateExpectedValidation } = require('../validation/expected.validation')

const router = express.Router()

router.get('/', cache, asyncWrap(getAllStocks))
router.get('/:stockCode', asyncWrap(getStock))
router.get('/expected-price/:stockCode', auth, asyncWrap(getExpectedPrice))
router.post('/expected-price/:stockCode', auth, validate(createExpectedValidation), asyncWrap(createExpectedPrice))
router.put('/expected-price/:stockCode', auth, validate(updateExpectedValidation), asyncWrap(updateExpectedPrice))
router.delete('/expected-price/:stockCode', auth, asyncWrap(deleteExpectedPrice))

module.exports = router
