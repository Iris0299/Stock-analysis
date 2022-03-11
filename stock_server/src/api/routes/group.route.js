const express = require('express')
const { validate } = require('express-validation')

const asyncWrap = require('../middlewares/asyncWrap')
const cache = require('../middlewares/nodeCache')
const { auth } = require('../middlewares/auth.middleware')
const { createGroupValidation } = require('../validation/group.validation')

const router = express.Router()

const {
  getGroup,
  createGroup,
  addStockToGroup,
  removeStockFromGroup,
  deleteGroup
} = require('../controllers/group.controller')

router.post('/', auth, validate(createGroupValidation), asyncWrap(createGroup))
router.get('/', auth, cache, asyncWrap(getGroup))
router.post('/:groupId', auth, asyncWrap(addStockToGroup))
router.delete('/:groupId', auth, asyncWrap(removeStockFromGroup))
router.delete('/', auth, asyncWrap(deleteGroup))

module.exports = router
