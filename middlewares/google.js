const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

module.exports = passport => passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
  
    const {id, photos, emails, displayName} = profile

    process.nextTick(() => {
      User.findOne({ email: emails[0].value }, (err, doc) => {
        if (err) return done(err)
        let user = doc
        if (user && user.googleId) return done(null, user)

        if  (!user) user = new User()
        if (!user.username) user.username = displayName
        user.googleId = id
        user.google = {
          name: displayName,
          token: accessToken
        }

        user.photos.push(
          ...photos.map(photo => ({
            url: photo.value,
            isDefault: false
          }))
        )
        user.isVerified = true

        if (user?.photos?.length === 1)
          user.photos[0].isDefault = true

        user.save(err => {
          if (err) return done(err)
          return done(null, user)
        })
      })
    })
  })
)