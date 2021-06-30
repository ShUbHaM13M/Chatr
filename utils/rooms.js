
const Room = require('../models/room')

async function getUsersInRoom (roomId) {
  const room = await Room.findById(roomId)
  return room.members
}

async function checkRoomExists (members) {
  let exists = false
  const room = await Room.findOne({members})
  const alternateRoom = await Room.findOne({members: members.reverse()})
  if (room || alternateRoom) {
    exists = true
  }
  return exists
}

async function createRoom (members) {
  const room = await Room({members})
  room.save()
  return room._id
} 


module.exports = {
	createRoom,
	checkRoomExists,
	getUsersInRoom
}