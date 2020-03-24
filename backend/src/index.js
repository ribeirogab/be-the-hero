const server = require('./configs/server')
const [publicRoutes, privateRoutes] = require('./routes')

server.use(publicRoutes)
server.use(privateRoutes)

server.listen(3333)
