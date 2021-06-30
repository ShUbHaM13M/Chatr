const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Token = require('./token')

const UserSchema = mongoose.Schema({
  username: String,
  email: {type: String, unique: true},
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  facebookId: String,
  photos: [{ url: String, isDefault: Boolean }],
  facebook: { type: mongoose.Schema.Types.Mixed },
  googleId: String,
  google: { type: mongoose.Schema.Types.Mixed },
  connections: {type: [mongoose.Schema.Types.ObjectId], ref: 'rooms'},
  isActive: {type: Boolean}
}, {timestamps: true})

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
    facebook: this.facebook,
    google: this.google,
    photos: this.photos
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  })

}

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000
};

UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString('hex')
  }
  return new Token(payload)
}

module.exports = mongoose.model('user', UserSchema)