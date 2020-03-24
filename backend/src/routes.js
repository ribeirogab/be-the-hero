const { Router } = require('express')
const NgoController = require('./controllers/NgoController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = Router()

routes.post('/sessions', SessionController.store)

routes.get('/ngos', NgoController.index)
routes.post('/ngos', NgoController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store)
routes.delete('/incidents/:incidentId', IncidentController.destroy)

module.exports = routes
