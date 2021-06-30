import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'

const FlashContext = React.createContext(null)

export function useFlashMessage () {
	return useContext(FlashContext)
}

function FlashProvider ({children}) {

	const initialValue = {message: '', type: ''}
	const [flashMessage, setFlashMessage] = useState(initialValue)

	useEffect(() => {
		if (flashMessage.message.length > 0) {
			setTimeout(() => {
				setFlashMessage(initialValue)
			}, 3000)
		}
	}, [flashMessage.message])

	const value = {flashMessage, setFlashMessage}

	return <FlashContext.Provider value={value}>
		{children}
	</FlashContext.Provider>
}

FlashProvider.propTypes = {
	children: PropTypes.array
}

export default FlashProvider