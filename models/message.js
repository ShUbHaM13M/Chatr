const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
	roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'rooms'},
	message: {type: String},
	by: {type: mongoose.Schema.Types.ObjectId},
}, {timestamps: true})

module.exports = mongoose.model('message', MessageSchema)