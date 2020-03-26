import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import api from './services/api'
import logout from './services/logout'

import PrivateRoute from './components/PrivateRoute'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routes () {
  const [ngo, setNgo] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    async function getNgo () {
      if (token) {
        try {
          localStorage.setItem('token', token)
          const { data } = await api.get('/ngos/u/I', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setNgo(data)
        } catch (error) {
          logout()
          console.error(error)
        }
      }
    }
    getNgo()
  }, [token])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={({ history }) => <Logon setToken={setToken} history={history}/>}/>
        <Route path="/register" component={({ history }) => <Register setToken={setToken} history={history}/>}/>
        <PrivateRoute path="/profile" ngo={ngo} component={Profile}/>
        <PrivateRoute path="/incidents/new" ngo={ngo} component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  )
}
