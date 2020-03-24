const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const ngos = await connection('ngos').select('*')
    return res.json(ngos)
  },

  async store (req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ngos').insert({ id, name, email, whatsapp, city, uf })

    return res.json({ id })
  }
}
