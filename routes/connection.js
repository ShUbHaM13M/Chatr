const express = require('express')
const router = express.Router()
const socket = require('../controller/socket')
const io = socket.getInstance()
const {checkRoomExists, createRoom} = require('../utils/rooms')
const {getAllContacts} = require('../utils/contacts')
const {getUserById, getUserByUsername} = require('../utils/user')

router.post('/:id/add-contact/', async (req, res) => {

  const id = req.params?.id
  const {toAdd} = req.body
  if (!id || !toAdd) return res.status(404).json({message: 'An error occured', success: false})
  
  try {
    const user = await getUserById(id)
    if (!user) return res.status(401).json({
      message: 'User with the provided id not found', success: false
    })

    let userToAdd
    let userFound = false
    if (toAdd.match(/^[0-9a-fA-F]{24}$/)) {
      userToAdd = await getUserById(toAdd)
      if (userToAdd) userFound = true 
    } else {
      userToAdd = await getUserByUsername(toAdd)
      if (userToAdd) userFound = true 
    }
    if (!userFound) return res.status(404).json({ 
      message: 'Entered username or userid doesnot exists',
      success: false
    })

    if (user._id === userToAdd._id) 
      return res.status(401).json({
        message: 'Cannot add Yourself as of now',
        success: false
      })

    const members = [user._id, userToAdd._id]

    const exists = await checkRoomExists(members)
    if (exists) {
      return res.status(409).json({
        message: 'User already exists in Your contact.',
        success: false
      })
    }

    const roomId = await createRoom(members)
    user.connections.push(roomId)
    userToAdd.connections.push(roomId)
    userToAdd.save()
    // notifyContactAdded(userToAdd, user)

    user.save((err) => {
      if (err) return res.status(500).json({message: 'Error adding the user to contacts' })
      getAllContacts(user)
        .then(contacts => {
          return res.status(200).json({
            contacts,
            success: true
          })
        })
    })
  } catch (err) {
    return res.status(500).json({message: err.message})
  } 
})

router.get('/:id/get-contacts/', async (req, res) => {
  const id = req.params?.id
  if (!id) return res.status(404).json({message: 'An error occured'})
  
  try {
    const user = await getUserById(id)
    if (!user) return res.status(401).json({message: 'User with the provided id not found'})
    
    const contacts = await getAllContacts(user)
    return res.status(200).json({
      contacts
    })
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
})

module.exports = router