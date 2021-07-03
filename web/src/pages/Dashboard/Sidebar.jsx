import React, { useEffect, useRef } from 'react'
import AddButton from '../../components/Input/AddButton'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'
import { useContacts } from '../../contexts/ContactsContext'
import Text from './SidebarText'
import ContactList from './ContactList'
import { Link } from 'react-router-dom'
import { useConversation } from '../../contexts/ConversationContext'

function Sidebar({ showContactDialog, extended, setExtended }) {

  const NO_USER_IMG = '../images/no-photo.svg'

  const sidebarRef = useRef(null)
  const backBtnRef = useRef(null)
  const { selectedConversation } = useConversation()

  const { contacts } = useContacts()

  function onAddClick() {
    showContactDialog(true);
  }

  function openSidebar() {
    sidebarRef.current.classList.add('extended')
    backBtnRef.current.style.transform = "rotate(0deg)"
    sidebarRef.current.classList.remove('hover')
  }

  function closeSidebar() {
    sidebarRef.current.classList.remove('extended')
    backBtnRef.current.style.transform = "rotate(180deg)"
    setTimeout(() => {
      sidebarRef.current ? sidebarRef.current.classList.add('hover') : null
    }, 450)
  }

  const { user } = useAuth()

  useEffect(() => {
    if (extended) {
      openSidebar()
      return
    }
    closeSidebar()
  }, [extended])

  const userPhoto = user.photos.length
    ? user.photos.filter((photo) => photo.isDefault)[0].url
    : NO_USER_IMG

  return (
    <div
      className={`bg-primary w-24 h-screen bg-opacity-70 absolute md:static
        flex flex-col backdrop-filter backdrop-blur bg-clip-padding
        p-2 md:p-4 items-center justify-between
        transition-all duration-350 ease-in-out md:ease-spring
        z-10 
        ${extended ? 'w-screen md:w-60 left-0' : 'md:hover:w-28 -left-full'}`}
      ref={sidebarRef}>
      <button className='item' onClick={() => {
        if (selectedConversation.length !== 0)
          setExtended(prev => !prev)
      }}>
        <img className="transition-transform duration-350 ease-in-out w-12" src="../images/back.svg" alt="<-" ref={backBtnRef} />
      </button>
      <div className='flex flex-1 self-start flex-col text-white
        w-full justify-items-start
        py-8 gap-4 top-16
        transition-all duration-350 ease-in-out'>
        {user &&
          <div className="item">
            <img className="user-img" src={userPhoto} alt="" id="my-profile" />
            <Text extended={extended}>{user.username}</Text>
          </div>
        }
        <div className="self-center divider" />
        <div className="flex flex-col flex-1 items-center justify-between">
          <ContactList contacts={contacts} extended={extended} setExtended={setExtended} />
          <AddButton onClick={onAddClick} />
        </div>
      </div>
      <Link className='item' to={{pathname: "/setting", state: {user}}} >
        <img className="select-none w-12" src="../images/settings.svg" alt="settings" />
      </Link>
    </div>
  )
}

Sidebar.propTypes = {
  showContactDialog: PropTypes.func,
  extended: PropTypes.bool,
  setExtended: PropTypes.func
}

export default Sidebar
