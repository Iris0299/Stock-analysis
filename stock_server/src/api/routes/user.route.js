const express = require('express')
const { validate } = require('express-validation')

const asyncWrap = require('../middlewares/asyncWrap')
const { signup, login, getInfo } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const { loginValidation, signupValidation } = require('../validation/user.validation')

const router = express.Router()

router.post('/login', validate(loginValidation), asyncWrap(login))
router.post('/signup', validate(signupValidation), asyncWrap(signup))
router.get('/info', auth, getInfo)

module.exports = router
