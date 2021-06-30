import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FacebookBtn from '../../components/FacebookBtn'
import GoogleBtn from '../../components/GoogleBtn'
import Input from '../../components/Input'
import BorderedContainer from '../../components/BorderedContainer'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/Input/Button'
import { useFlashMessage } from '../../contexts/FlashContext'

function SignIn() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {setFlashMessage} = useFlashMessage()

  const disabled = email.length === 0
    || password.length === 0
    || confirmPassword.length === 0
    || username.length === 0

  const SIGNUP_URL = `${import.meta.env.API_URL}/auth/signup`
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    if (user)
      history.push('/')
  }, [user])

  async function onSubmit(e) {
    e.preventDefault()

    const res = await fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ username, email, password, }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json()
    setFlashMessage({message: data.message, type: data.type})
  }

  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white'
  }

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <BorderedContainer glass style={style}>

          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-4">
            <div className="logo">Chatr.</div>

            <Input
              placeholder="username"
              type="text"
              name="username"
              required
              value={username}
              setValue={setUsername} />

            <Input
              placeholder="email"
              name="email" type="email"
              required
              value={email}
              setValue={setEmail} />

            <Input
              placeholder="password"
              name="password"
              type="password"
              required
              value={password}
              setValue={setPassword} />

            <Input
              placeholder="confirm password"
              type="password"
              required
              value={confirmPassword}
              setValue={setConfirmPassword} />

            <Button
              type="submit"
              primary
              text="Sign up"
              disabled={disabled || !(password === confirmPassword)} />

            <div className="divider"></div>

            <div className="flex gap-4">
              <FacebookBtn />
              <GoogleBtn />
            </div>
          </form>
        </BorderedContainer>
        <BorderedContainer glass style={style}>
          <div className="">
            <Link to="/login">Click here to Log in</Link>
          </div>
        </BorderedContainer>
      </div>
    </div>
  )
}

export default SignIn
