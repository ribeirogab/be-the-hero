const server = require('./configs/server')
const routes = require('./routes')

server.use(routes)

server.listen(3333)
