import React from 'react'
import PropTypes from 'prop-types'
import Text from './SidebarText'
import { useConversation } from '../../contexts/ConversationContext'

function ContactList({ contacts, extended, setExtended }) {
	const NO_USER_IMG = '../images/no-photo.svg'
	const { setSelectedConversation } = useConversation()

	function onContactPressed (contact) {
		setSelectedConversation(contact)
		setExtended(false)
	}

	return (
		<div className="flex flex-col flex-1 items-center gap-4">
			{contacts && contacts.map(contact => {
				const photoExist = contact.photos?.length !== 0 ? true : false
				return <div
					className="flex justify-start items-center" key={contact._id}
					onClick={() => { onContactPressed(contact) }}>
					<div className="relative">
						<img
							className="user-img"
							src={photoExist ? contact.photos[0].url : NO_USER_IMG}
							alt={contact.username} />
						<div className={`badge ${contact?.isActive ? 'active' : ''}`} />
					</div>
					<Text extended={extended}>{contact.username}</Text>
				</div>
			})}
			{contacts && contacts.length <= 0 &&
				<div>No contacts here 🙁</div>
			}
		</div>
	)
}

ContactList.propTypes = {
	contacts: PropTypes.array,
	extended: PropTypes.bool,
	setExtended: PropTypes.func
}

export default ContactList

