
import React from 'react'
import PropTypes from 'prop-types'

function Input({
  type,
  value,
  setValue,
  ...rest
}) {
  return (
    <input
      type={type}
      className="py-4 px-6 sm:py-2 sm:px-4 min-w-full
      outline-none border border-solid 
      border-offBlack rounded-md text-base text-black
      hover:border-primary
      focus:border-primary focus:bg-primary
      focus:text-white transition-colors duration-300 ease-in-out
      " 
      value={value}
      onChange={e => setValue(e.target.value)}
      {...rest}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  rest: PropTypes.object
}

export default Input
