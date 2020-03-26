import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/img/logo.svg'
import api from '../../services/api'

export default function NewIncident () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      await api.post('/incidents', { title, description, value }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTitle('')
      setDescription('')
      setValue('')
      alert('Caso cadastrado com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size="16" color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso"/>

          <textarea
            value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"></textarea>

          <input
            value={value} onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"/>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
