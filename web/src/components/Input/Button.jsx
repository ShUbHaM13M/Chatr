import React from 'react'
import PropTypes from 'prop-types'

function Button({ text, primary, ...rest }) {
  return (
    <button
      className={`min-w-full py-4 px-6 sm:py-2 sm:px-4 
        ${primary ? 'bg-primary text-white shadow-md'
        : 'border border-gray-300 hover:bg-white hover:text-black focus:text-black focus:bg-white'}
        rounded-md hover:opacity-80 focus:opacity-80
        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-100
        transition-colors duration-350 ease-in-out`}
      {...rest} >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  primary: PropTypes.bool,
}

export default Button
