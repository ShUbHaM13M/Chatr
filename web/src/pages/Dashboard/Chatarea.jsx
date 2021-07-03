import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Message from './Message'
import { useSocket } from '../../contexts/SocketContext'
import { useConversation } from '../../contexts/ConversationContext'
import NoConversation from './NoConversation'
import Typing from '../../components/Typing'
import PropTypes from 'prop-types'

function Chatarea({ setExtended }) {

  const chatAreaRef = useRef(null)
  const messageRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const { user } = useAuth()
  const { socket } = useSocket()
  const { selectedConversation, conversationHistory } = useConversation()
  const [conversationTyping, setConversationTyping] = useState(false)
  let timeout = useRef(null)

  function onTyping(e) {
    if (e.key !== 'Enter') {
      socket.emit('typing', {
        user: user._id,
        typing: true,
        recipient: selectedConversation._id
      })
      clearTimeout(timeout.current)
      timeout.current = setTimeout(typingTimeout, 3000)
      return
    }
    clearTimeout(timeout.current)
    typingTimeout()
    sendMessage()
  }

  function typingTimeout() {
    socket.emit('typing', {
      user: user._id,
      typing: false,
      recipient: selectedConversation._id
    })
  }

  function sendMessage() {
    if (message.length === 0) return
    socket.emit('send-message', {
      recipient: selectedConversation._id,
      message,
      by: user._id,
      roomId: selectedConversation.roomId,
      timestamp: Date.now()
    })
    setMessages(prev => [...prev, { message, by: user._id, timestamp: Date.now() }])
    setMessage('')
  }

  function onSubmit(e) {
    e.preventDefault()
    sendMessage()
  }

  useEffect(() => {
    console.log(messageRef)
    if (messageRef.current !== null) {
      messageRef.current.scrollIntoView()
    }
  }, [messageRef.current])

  useEffect(() => {
    if (!socket) return
    socket.on('receive-message', ({ by, message, timestamp }) => {
      setMessages(prev => [...prev, { message, by, timestamp }])
    })

    socket.on('user-typing', ({ typing }) => {
      setConversationTyping(typing)
    })

    return () => {
      socket.off('receive-message')
      socket.off('user-typing')
    }
  }, [socket])

  useEffect(() => {
    if (selectedConversation)
      setMessages([])
  }, [selectedConversation])

  useEffect(() => {
    if (conversationHistory) {
      setMessages(prev => [...prev, ...conversationHistory])
    }
  }, [conversationHistory])

  return (
    <>
      {selectedConversation.length !== 0 ?
        <div className="flex flex-1 gap-2 max-h-screen flex-col justify-between py-2 px-4 md:py-4 md:px-8 glass text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div>
            <div className="flex gap-2 items-center relative">
              <button className='item block md:hidden transform rotate-180'
                onClick={() => setExtended(prev => !prev)}>
                <img className="transition-transform duration-350 ease-in-out w-12"
                  src="../images/back.svg" alt="<-" />
              </button>
              <div className={`rounded-full h-3 w-3 border-gray-300 border-2 
              ${selectedConversation.isActive ? 'bg-green-400' : 'bg-gray-600'}`} />
              <h2 className="text-xl">{selectedConversation.username}</h2>
            </div>
            <div className="divider mt-4" style={{ width: '100%' }}></div>
          </div>
          <div ref={chatAreaRef} className="flex flex-1 flex-col gap-1 py-4 px-1 
          overflow-y-auto overflow-x-hidden">
            {messages.map(({ message, by, timestamp }, index) =>
              <Message 
                key={index} 
                message={message} 
                userId={by}
                forwardRef={index === messages.length - 1 ? messageRef : null} 
                timestamp={timestamp} />
            )}
          </div>

          {conversationTyping && <Typing />}

          <form onSubmit={onSubmit} className="flex pr-4 bg-gray-200
          border border-gray-50 rounded-full bg-opacity-30
          focus-within:border-primary focus-within:bg-primary focus-within:bg-opacity-100
          transition-all duration-350 ease-in-out">
            <input
              className="flex-1 focus:outline-none bg-transparent 
              py-4 px-6 md:px-4 md:py-3
              focus:placeholder-gray-600 text-white"
              placeholder='Type a message... ✌🏽'
              value={message}
              onInput={onTyping}
              // onKeyPress={onTyping}
              onChange={e => setMessage(e.target.value)} />
            <button className="cursor-pointer 
            transform transition-transform duration-350 ease-in-out
            hover:-translate-y-1">
              <img className='w-8 h-8 filter brightness-0 invert'
                src="../images/send.svg" alt="send" />
            </button>
          </form>
        </div> :
        <NoConversation setExtended={setExtended} />}
    </>
  )
}

Chatarea.propTypes = {
  extended: PropTypes.bool,
  setExtended: PropTypes.func
}

export default Chatarea
