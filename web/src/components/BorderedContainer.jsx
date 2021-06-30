import React from 'react'
import PropTypes from 'prop-types'

function BorderedContainer({ children, glass = false, ...rest }) {
  return (
    <div className={`rounded-md flex items-center 
      py-5 px-7 sm:py-4 sm:px-6 my-3 flex-col 
      border-solid border border-offBlack
      ${glass ? 'glass' : ''}`} {...rest}>
      {children}
    </div>
  )
}

BorderedContainer.propTypes = {
  children: PropTypes.node,
  glass: PropTypes.bool,
  rest: PropTypes.object
}

export default BorderedContainer
