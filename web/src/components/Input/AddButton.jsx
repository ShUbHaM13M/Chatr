import React from 'react'
import PropTypes from 'prop-types'

function AddButton({onClick}) {
	// should rotate to make x on Click ?
	return (
		<div 
			onClick={onClick}
			className="h-12 w-1/4 md:w-12 rounded-md
			border-white border-4 md:border-none cursor-pointer
			flex items-center justify-center">
			<svg className="stroke-current text-white" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path className="hidden md:block" d="M24.7166 47.073C37.143 47.073 47.2166 36.9994 47.2166 24.573C47.2166 12.1466 37.143 2.073 24.7166 2.073C12.2901 2.073 2.21655 12.1466 2.21655 24.573C2.21655 36.9994 12.2901 47.073 24.7166 47.073Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M24.7166 15.573V33.573" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M15.7166 24.573H33.7166" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		</div>
	)
}

AddButton.propTypes = {
	onClick: PropTypes.func
}

export default AddButton
