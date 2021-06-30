const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	roomId: String,
	title: String,
	members: {type: [mongoose.Schema.Types.ObjectId], ref: 'users'}
})

module.exports = mongoose.model('room', RoomSchema)