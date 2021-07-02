import React from 'react'
import PropTypes from 'prop-types'

function AddButton({onClick}) {
	return (
		<svg 
			onClick={onClick}
			className="stroke-current text-white h-12 w-1/4 cursor-pointer item
			flex items-center justify-center" 
			style={{minWidth: '40px', minHeight: '48px'}}
			width="50" height="50" 
			viewBox="0 0 50 50" fill="none" 
			xmlns="http://www.w3.org/2000/svg">
			<path d="M24.7166 47.073C37.143 47.073 47.2166 36.9994 47.2166 24.573C47.2166 12.1466 37.143 2.073 24.7166 2.073C12.2901 2.073 2.21655 12.1466 2.21655 24.573C2.21655 36.9994 12.2901 47.073 24.7166 47.073Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M24.7166 15.573V33.573" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M15.7166 24.573H33.7166" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}

AddButton.propTypes = {
	onClick: PropTypes.func
}

export default AddButton
