const bcrypt = require('bcryptjs')
const connection = require('../database/connection')
const generateToken = require('../utils/generateToken')

module.exports = {
  async store (req, res) {
    const { email, password } = req.body

    const ngo = await connection('ngos').where('email', email).select('id', 'password').first()
    if (!ngo) return res.status(400).json({ error: 'NGO not found.' })

    if (!await bcrypt.compare(password, ngo.password)) return res.status(400).json({ error: 'Invalid login.' })

    return res.json({ token: generateToken({ id: ngo.id }) })
  }
}
