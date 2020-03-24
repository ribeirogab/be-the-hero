const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ngos', 'ngo_id', '=', 'incidents.ngo_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ngos.name', 'ngos.email', 'ngos.whatsapp', 'ngos.city', 'ngos.uf'])

    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  },

  async store (req, res) {
    const { title, description, value } = req.body
    const ngoId = req.headers.ngo_id

    const [id] = await connection('incidents').insert({ title, description, value, ngo_id: ngoId })

    return res.json({ id })
  },

  async destroy (req, res) {
    const { incidentId } = req.params
    const ngoId = req.headers.ngo_id

    const incident = await connection('incidents').where('id', incidentId).select('ngo_id').first()

    if (incident.ngo_id !== ngoId) return res.status(401).json({ error: 'Operation not permitted.' })

    await connection('incidents').where('id', incidentId).delete()

    return res.json(204).send()
  }
}
