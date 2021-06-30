const express = require('express')
const router = express.Router()
const Message = require('../models/message')

router.get('/:roomId', async (req, res) => {
	const {roomId} = req.params
	if (roomId !== undefined) {
		const messages = await Message.find({ roomId }).catch(err => {})
		return res.status(200).json({
			messages,
			success: true
		})
	}
	return res.status(401).json({
		message: 'need to provide a room id to get messages',
		success: false
	})

})

module.exports = router