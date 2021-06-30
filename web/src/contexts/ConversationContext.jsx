import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'

const ConversationContext = React.createContext(null)

export function useConversation () {
	return useContext(ConversationContext)
}

const API_URL = import.meta.env.API_URL

const ConversationProvider = ({children}) => {

	const [selectedConversation, setSelectedConversation] = useState([])
	const [conversationHistory, setConversationHistory] = useState([])

	async function getHistory (selectedConversation) {
		const url = `${API_URL}/messages/${selectedConversation.roomId}`
		const res = await fetch(url)
		const data = await res.json()
		if (res.ok && data.success) {
			return data.messages
		}
		return null
	}

	useEffect(() => {
		if (selectedConversation) 
			getHistory(selectedConversation)
				.then(history => setConversationHistory(
					history ? history.map(({_id, by, message, roomId, createdAt}) => {
					return {_id, by, message, roomId, timestamp: createdAt}
					}) : []
				))
	}, [selectedConversation])

	const value = {
		selectedConversation, setSelectedConversation, conversationHistory
	}

	return <ConversationContext.Provider value={value}>
		{children}
	</ConversationContext.Provider>
}

ConversationProvider.propTypes = {
	children: PropTypes.node,
}

export default ConversationProvider