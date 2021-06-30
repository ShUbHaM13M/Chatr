const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Token = require('../models/token');
const passport = require('passport');

router.get('/', passport.authenticate(
    'jwt', 
    {session: false}
  ), (req, res) => {
    const {user} = req
    if (!user) return res.status(401).json({message: 'Not Authorized'})

  return res.status(200).json({
    user
  })
})

module.exports = router;