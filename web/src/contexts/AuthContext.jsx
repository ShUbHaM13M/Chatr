import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = React.createContext(null)

export function useAuth () {
  return useContext(AuthContext)
}

const AuthProvider = ({children, setId}) => {

  const [user, setUser] = useState(null)
  const [jwtToken, setJwtToken] = useLocalStorage('token', '')
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.API_URL

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json()
      if (res.ok) {
        if (data.type === 'success') {
          setUser(data.user)
          setId(data.user?._id) 
          return
        }
      }
    } catch (err) {
      console.log(err)
      setUser(null)
    }
  }

  function logout () {
    fetch(`${API_URL}/auth/logout`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setJwtToken(null)
        }
      })
  }

  useEffect(() => {
    setLoading(true)
    jwtToken
    ? fetchUser() 
    : setUser(null)
    setLoading(false)
  }, [jwtToken])

  const value = {
    user, setUser, setJwtToken, logout
  }

  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
}

AuthProvider.propTypes ={
  children: PropTypes.node,
  setId: PropTypes.func
}

export default AuthProvider