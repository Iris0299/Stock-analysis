const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { jwtKey } = require('../../configs/config')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    username: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.createToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, jwtKey, {
    expiresIn: '10days'
  })

  return token
}

userSchema.pre('save', async function (next) {
  const user = this

  user.password = await bcrypt.hash(user.password, 10)

  next()
})

module.exports = mongoose.model('User', userSchema)
