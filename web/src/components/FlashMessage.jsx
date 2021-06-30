import React from 'react'
import { useFlashMessage } from '../contexts/FlashContext'

function FlashMessage() {

	const {flashMessage} = useFlashMessage()
	
	return (
		<>
			{flashMessage.message.length > 0 ? 
				(<div className={`text-white absolute top-4 right-1/2 md:right-4 z-20 
					transform translate-x-2/4 md:translate-x-0
					backdrop-blur backdrop-filter bg-clip-padding border-2 p-4 md:p-2 w-64 rounded-md
						${flashMessage.type === 'danger' 
						? 'border-danger bg-danger bg-opacity-50' 
						: 'border-green-500 bg-green-500 bg-opacity-50'}
					`}>
						{flashMessage.message}
				</div>) : ''}
		</>
	)
}

export default FlashMessage
