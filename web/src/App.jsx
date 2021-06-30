import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import AuthProvider from './contexts/AuthContext'
import SocketProvider from './contexts/SocketContext'
import Loading from './components/Loading'
import FlashProvider from './contexts/FlashContext'
import FlashMessage from './components/FlashMessage'
import useLocalStorage from './hooks/useLocalStorage'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Login = React.lazy(() => import('./pages/Login'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const Setting = React.lazy(() => import('./pages/Setting'))
const Easter = React.lazy(() => import('./pages/Easter'))

const App = () => {

  const [id, setId] = useState()
  const [uid] = useLocalStorage('uid', Math.random().toString(36).substring(7))

  return (
    <FlashProvider>
      <AuthProvider setId={setId}>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path={"/login"}>
                <Login />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="/setting" >
                <Setting />
              </Route>
              <Route path={`/${uid}`}>
                <Easter />
              </Route>
              <PrivateRoute path='/' exact>
                <SocketProvider id={id} >
                  <Dashboard />
                </SocketProvider>
              </PrivateRoute>
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
      <FlashMessage />
    </FlashProvider>
  )
}

export default App