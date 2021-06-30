import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket () {
  return useContext(SocketContext)
}

function SocketProvider ({id, children}) {

  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:3000',
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  const value = {socket}

  return <SocketContext.Provider value={value}>
    {children}
  </SocketContext.Provider>

}

SocketProvider.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node
}

export default SocketProvider