const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const incidents = await connection('incidents').where('ngo_id', req.ngoId).select('*')

    return res.json(incidents)
  }
}
