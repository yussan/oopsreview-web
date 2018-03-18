import restify from 'restify'
// import routes from './routes'
import render from './render'
import debug from 'debug'
import routes from './routes'

// handlers
import handlerSeal from './handlers/seal'

const { NODE_ENV } = process.env

// load .env configuration
if(NODE_ENV == 'development') {
  require('dotenv').config()
}

const debugServer = debug('app:server')

const server = restify.createServer()
const port = process.env.PORT || 19090

// routes
routes(server)

if(NODE_ENV == 'development') {
  server.get('/api/generate-seal', handlerSeal)
}

// serve static file from public directory
server.get(/\/?.*\//, restify.plugins.serveStatic({
  directory: `${__dirname}/../../public`,
  maxAge: 0
}))

// render vuejs
server.on('NotFound', render)

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})