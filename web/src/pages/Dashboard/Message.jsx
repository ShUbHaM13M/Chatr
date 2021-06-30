import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function Message({ userId, message, timestamp }) {

  const {user} = useAuth()
  const isMessageByUser = userId === user._id
  const time = dayjs(timestamp)

  return (
    <>
      <div className={`
        text-lg p-4 max-w-xs h-auto rounded-xl
        text-white
        break-words bg-primary relative 
        ${isMessageByUser
          ? 'self-end rounded-tr-sm'
          : 'self-start rounded-bl-sm'}`} >
        <p>{message}</p>
      </div>
      <p className={`select-none pointer-events-none text-xs text-gray-200 
      ${isMessageByUser ? 'text-right' : 'text-left'}`}>
        {time.fromNow()}
      </p>
    </>
  )
}

Message.propTypes = {
  userId: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

export default Message
