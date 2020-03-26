import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'
import herosImg from '../../assets/img/heroes.png'
import logo from '../../assets/img/logo.svg'

export default function Logon ({ setToken, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogon (e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (!data.token) throw new Error('E-mail ou senha inválido(s).')
      setToken(data.token)
      history.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero"/>
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input type="email" placeholder="Seu e-mail" value={email}
            onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Sua senha" value={password}
            onChange={e => setPassword(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size="16" color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heroes" />
    </div>
  )
}

Logon.propTypes = {
  setToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}
