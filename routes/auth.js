const express = require('express')
const {check} = require('express-validator')
const passport = require('passport')

const Auth = require('../controller/auth')

const router = express.Router()

const generateHtmlWithEmbeddedJWT = user => (`
  <html>
    <script>
      window.localStorage.setItem('chatr.-token', '${user.generateJWT()}')
      window.location.href = '/'
    </script>
  </html>
`)

router.post('/signup', Auth.register)

router.post('/login', Auth.login)

router.get('/error', (req, res) => res.send('Unknown Error'))

router.get('/facebook', passport.authenticate('facebook',  { scope : ['email']}))
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/verify/:token', Auth.verify)
router.post('/resend', Auth.resendToken)

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/', session: false }),
  ({user}, res) => {
    if (user) 
      return res.send(generateHtmlWithEmbeddedJWT(user))

    return res.status(500).json({
      message: 'Error connecting with Facebook'
    })
  }
)

router.get('/google/callback', 
  passport.authenticate('google', {failureRedirect: '/', session: false}),
  ({user}, res) => {
    if (user) 
      return res.send(generateHtmlWithEmbeddedJWT(user))

    return res.status(500).json({
      message: 'Error connecting with Google'
    })
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({success: true})
})

module.exports = router