const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(user, done) {
  done(null, user)
})

module.exports = passport => passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ['id', 'emails','displayName', 'picture.type(large)'],
    passReqToCallback: true,
  }, 
  function (req, accessToken, refreshToken, profile, done) {
    const {emails, id, displayName, photos} = profile

    process.nextTick(() => {
      User.findOne({ email: emails[0].value }, (err, user) => {
        if (err) return done(err)
        
        if (user && user.facebookId) return done(null, user)

        user.facebookId = id
        user.facebook = {
          name: displayName,
          token: accessToken
        }
        
        user.photos.push(
          ...photos.map((photo => ({
            url: photo.value,
            isDefault: false
          }))
        ))
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