import React from 'react'
import PropTypes from 'prop-types'

function SidebarText({ children, extended }) {
  return (
    <div
      className={`transition-opacity ease-in-out duration-350
      ${extended ? 'opacity-1 w-auto ml-4' : 'opacity-0 w-0'}`}>
      {children}
    </div>
  )
}

SidebarText.propTypes = {
  children: PropTypes.node,
  extended: PropTypes.bool,
}

export default SidebarText
