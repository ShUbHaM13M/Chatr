const auth = require('./auth')
const user = require('./user')
const connection = require('./connection')
const chat = require('./chat')

module.exports = app => {
  app.use('/api/auth', auth)
  app.use('/api/user', user)
  app.use('/api/user/connection', connection)
  app.use('/api/messages', chat)
}