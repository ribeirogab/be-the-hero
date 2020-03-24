const { Router } = require('express')
const NgoController = require('./controllers/NgoController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const authenticateMiddleware = require('./middlewares/authenticate')

const publicRoutes = Router()
const privateRoutes = Router().use(authenticateMiddleware)

publicRoutes.post('/sessions', SessionController.store)

publicRoutes.get('/ngos', NgoController.index)
publicRoutes.post('/ngos', NgoController.store)

privateRoutes.get('/profile', ProfileController.index)

publicRoutes.get('/incidents', IncidentController.index)
privateRoutes.post('/incidents', IncidentController.store)
privateRoutes.delete('/incidents/:incidentId', IncidentController.destroy)

module.exports = [publicRoutes, privateRoutes]
