
const User = require('../models/user');

async function getUserByUsername (username) {
  return await User.findOne({username})
}

async function getUserById (id) {
  return await User.findOne({_id: id})
}

module.exports = {
	getUserByUsername,
	getUserById
}