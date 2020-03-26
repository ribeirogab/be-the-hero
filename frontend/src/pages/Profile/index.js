import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/img/logo.svg'
import api from '../../services/api'

export default function Profile ({ ngo }) {
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function getIncidents () {
      const { data } = await api.get('/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setIncidents(data)
    }
    getIncidents()
  }, [])

  async function handleDelete (id) {
    try {
      const confirm = window.confirm('Tem certeza que deseja deletar este caso?')
      if (confirm) {
        const { data } = await api.delete(`/incidents/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setIncidents(incidents.filter(incident => incident.id !== id))
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function handleLogout () {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero"/>
        <span>Bem vinda, {ngo.name}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.length !== 0 ? incidents.map((incident, index) => (
          <li key={index}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size="20" color="#a8a8b3"/>
            </button>
          </li>
        )) : 'Nenhum caso cadastrado...'}
      </ul>
    </div>
  )
}

Profile.propTypes = {
  ngo: PropTypes.object.isRequired
}
