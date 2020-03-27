const { Router } = require('express')
const NgoController = require('./controllers/NgoController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const authenticate = require('./middlewares/auth/authenticate')

const sessionValidator = require('./middlewares/validators/sessionValidator')
const ngoValidator = require('./middlewares/validators/ngoValidator')
const incidentValidator = require('./middlewares/validators/incidentValidator')

const routes = Router()

routes.post('/sessions', sessionValidator.store(), SessionController.store)

routes.get('/ngos', NgoController.index)
routes.get('/ngos/u/:ngoId', authenticate.token, NgoController.show)
routes.post('/ngos', ngoValidator.store(), NgoController.store)

routes.get('/profile', authenticate.token, ProfileController.index)

routes.get('/incidents', incidentValidator.index(), IncidentController.index)
routes.post('/incidents', authenticate.token, IncidentController.store)
routes.delete('/incidents/:incidentId', authenticate.token, IncidentController.destroy)

module.exports = routes
