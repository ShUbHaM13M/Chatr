import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function NoConversation({setExtended}) {

	useEffect(() => {
		setExtended(true)
	}, [])

	return (
		<div className="flex items-center justify-center flex-1 glass text-white" 
		 	style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
			<span className="text-xl text-center font-bold text-primary">
				No Conversation selected <br />
				<span className="text-base font-normal">
					select a contact from the sidebar to start conversation
				</span>
			</span>
		</div>
	)
}

NoConversation.propTypes = {
	setExtended: PropTypes.func
}

export default NoConversation

