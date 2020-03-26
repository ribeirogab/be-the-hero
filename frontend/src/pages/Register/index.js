import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'
import logo from '../../assets/img/logo.svg'

export default function Register ({ setToken, history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  async function handleRegister (e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/ngos', { name, email, password, whatsapp, city, uf })
      setToken(data.token)
      history.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size="16" color="#E02041" />
            Já possuo cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" value={name}
            onChange={e => setName(e.target.value)}/>

          <input type="email" placeholder="E-mail" value={email}
            onChange={e => setEmail(e.target.value)}/>

          <input type="password" placeholder="Senha" value={password}
            onChange={e => setPassword(e.target.value)}/>

          <input placeholder="WhatsApp" value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}/>

          <div className="input-group">
            <input placeholder="Cidade" value={city}
              onChange={e => setCity(e.target.value)}/>

            <input placeholder="UF" maxLength="2" style={{ width: 80 }} value={uf}
              onChange={e => setUf(e.target.value)}/>
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}
