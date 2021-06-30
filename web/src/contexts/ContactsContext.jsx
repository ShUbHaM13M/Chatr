import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSocket } from './SocketContext'

const ContactsContext = React.createContext(null)

export function useContacts() {
  return useContext(ContactsContext)
}

const ContactsProvider = ({ id, children }) => {

  const [contacts, setContacts] = useState([])
  const API_URL = import.meta.env.API_URL
  const { socket } = useSocket()

  async function fetchContacts() {
    const res = await fetch(`${API_URL}/user/connection/${id}/get-contacts`)
    const data = await res.json()
    if (res.ok && data) {
      setContacts([...data.contacts])
    }
  }

  async function addContact(toAdd) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ toAdd }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }
    try {
      const res = await fetch(`${API_URL}/user/connection/${id}/add-contact`, options)
      const data = await res.json()
      if (res.ok) {
        const { success } = data
        switch (success) {
          case false: {
            console.log(data.message)
            break
          }
          case true: {
            setContacts([...data.contacts])
          }
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (!socket && contacts.length <= 0) return
    socket.on('state-changed', ({ user_id, state }) => {
      setContacts(prev => prev.map(contact => {
        if (contact._id === user_id) return { ...contact, isActive: state }
        return contact
      })
      )
    })

    return () => socket.off('state-changed')
  }, [socket])

  useEffect(() => {
    fetchContacts()
  }, [id])

  const value = {
    contacts,
    addContact
  }

  return <ContactsContext.Provider value={value}>
    {children}
  </ContactsContext.Provider>
}

ContactsProvider.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node
}

export default ContactsProvider
