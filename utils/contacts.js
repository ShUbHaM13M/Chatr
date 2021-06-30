const User = require('../models/user')
const {getUsersInRoom} = require('./rooms')

async function getAllContacts (user) {
  let contacts = []
  const connectionLength = user.connections.length
  for (let i = 0; i < connectionLength; i++) {
    const roomId = user.connections[i];
    const members = await getUsersInRoom(roomId)
    const otherUsersId = await members.filter(id => !id.equals(user._id))
    const otherUsers = await User.find({ '_id': { $in: otherUsersId } })
    otherUsers.forEach(otherUser => {
      const data = {
        username: otherUser.username,
        _id: otherUser._id,
        photos: otherUser.photos,
        roomId,
        isActive: otherUser.isActive
      }
      contacts.push(data)
    }) 
  }

  return contacts
}

module.exports = {
	getAllContacts
}