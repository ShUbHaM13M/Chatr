import React, { useState } from 'react'
// import './dashboard.css'
import Sidebar from './Sidebar'
import Chatarea from './Chatarea'
import ContactsProvider from '../../contexts/ContactsContext'
import ConversationProvider from '../../contexts/ConversationContext'
import { useAuth } from '../../contexts/AuthContext'
import AddContactDialog from './AddContactDialog'

function Dashboard() {

  const {user} = useAuth()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [extended, setExtended] = useState(false)

  return (
    <ContactsProvider id={user?._id}>
      <div className="flex flex-col min-h-screen md:flex-row overflow-hidden">
        <ConversationProvider>
          <Sidebar showContactDialog={setShowAddDialog} 
            extended={extended} setExtended={setExtended} />
          <Chatarea extended={extended} setExtended={setExtended} />
        </ConversationProvider>
        {showAddDialog && 
          <AddContactDialog show={setShowAddDialog} />
        }
      </div>
    </ContactsProvider>
  )
}

export default Dashboard
