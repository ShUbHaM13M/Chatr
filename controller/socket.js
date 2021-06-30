
const socket = require('socket.io')
const Message = require('../models/message')
const User = require('../models/user')
const {getAllContacts} = require('../utils/contacts')

let io = null
const cors = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  credentials: true
}
module.exports = {
  initialize: function (server) {
    io = socket(server, {cors})
    io.on('connection', async socket => {
      const id = socket.handshake.query.id
      socket.join(id)
      const user = await User.findById(id)
      user.isActive = true
      user.save()
      sendUserStatusChange(user, true)

      async function sendUserStatusChange (user, state) {
        const contacts = await getAllContacts(user)
        for (contact of contacts) {
          socket.broadcast.to(contact._id.toString()).emit('state-changed', {
            user_id: user._id, 
            state
          })
        }
      }

      socket.on('send-message', ({recipient, message, by, roomId, timestamp}) => {
        socket.broadcast.to(recipient).emit('receive-message', {
          by: id, message, timestamp 
        })
        const doc = Message({message, by, roomId})
        doc.createdAt = timestamp
        doc.save()
      })

      socket.on('typing', ({recipient, typing, user}) => {
        socket.broadcast.to(recipient).emit('user-typing', {
          user, typing
        })
      })

      socket.on("disconnect", async () => {
        user.isActive = false
        user.save()
        sendUserStatusChange(user, false)
      })  
    })
  },
  getInstance: function () {
    return io
  }
}
