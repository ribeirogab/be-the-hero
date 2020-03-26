const bcrypt = require('bcryptjs')
const connection = require('../database/connection')
const generateToken = require('../utils/generateToken')

module.exports = {
  async index (req, res) {
    const ngos = await connection('ngos').select('id', 'name', 'email', 'whatsapp', 'city', 'uf')
    return res.json(ngos)
  },

  async show (req, res) {
    const ngoId = req.params.ngoId === 'I' ? req.ngoId : req.params.ngoId
    const ngos = await connection('ngos').where('id', ngoId).select('id', 'name', 'email', 'whatsapp', 'city', 'uf')
    return res.json(ngos[0])
  },

  async store (req, res) {
    const { name, email, password, whatsapp, city, uf } = req.body

    const ngoExists = await connection('ngos').where('email', email).select('email').first()
    if (ngoExists) return res.json(ngoExists)

    const hashPassword = await bcrypt.hash(password, 10)
    const [id] = await connection('ngos').insert({ name, email, password: hashPassword, whatsapp, city, uf })

    return res.json({ token: generateToken({ id: id }) })
  }
}
