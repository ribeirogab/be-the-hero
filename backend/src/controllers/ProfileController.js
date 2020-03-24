const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const ngoId = req.headers.ngo_id

    const incidents = await connection('incidents').where('ngo_id', ngoId).select('*')

    return res.json(incidents)
  }
}
