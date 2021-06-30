import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import BorderedContainer from '../../components/BorderedContainer'
import FacebookBtn from '../../components/FacebookBtn'
import GoogleBtn from '../../components/GoogleBtn'
import Input from '../../components/Input'
import Button from '../../components/Input/Button'
import { useAuth } from '../../contexts/AuthContext'
import { useFlashMessage } from '../../contexts/FlashContext'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const disabled = email.length === 0 || password.length === 0
  const LOGIN_URL = `${import.meta.env.API_URL}/auth/login`

  const {setFlashMessage} = useFlashMessage()
  const { user, setJwtToken } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (user)
      history.push('/')
  }, [user])

  async function onSubmit(e) {
    e.preventDefault()
    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json()
    if (data.token) {
      setFlashMessage({message: `logged in as ${email}`, type: 'success'})      
      setJwtToken(data.token)
      return
    }

    setFlashMessage({message: data.message, type: 'danger'})      
    setEmail('')
    setPassword('')
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
            className="flex flex-col items-center gap-4" >
            <div className="">Chatr.</div>
            <Input
              placeholder="email"
              name="email" type="email"
              required
              value={email}
              setValue={setEmail} />
            <Input
              placeholder="password"
              name="password" type="password"
              required
              value={password}
              setValue={setPassword} />
            <Button
              type="submit"
              text="Login"
              primary
              disabled={disabled} />
            <a href="#">Forgot password ?</a>
            <div className="divider"></div>
            <div className="flex gap-4">
              <FacebookBtn />
              <GoogleBtn />
            </div>
          </form>
        </BorderedContainer>
        <BorderedContainer glass style={style}>
          <div className="">
            <Link to="/sign-up">Click here to Sign up</Link>
          </div>
        </BorderedContainer>
      </div>
    </div>
  )
}

export default Login
