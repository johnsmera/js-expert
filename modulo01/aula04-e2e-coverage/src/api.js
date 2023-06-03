const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
  username: 'JohnSmera',
  password: '123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'))

    const toLower = (string) => string.toLowerCase()

    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401)
      response.end('Logging failed!')

      return
    }


    return response.end('Logged!')
  },
  default(request, response) {
    response.writeHead(404)
    return response.end('Not Found!')
  }
}

function handler(request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`

  const chosen = routes[routeKey] || routes.default

  return chosen(request, response)
}

const app = http.createServer(handler)

app.listen(3000, () => console.log('listening on http://localhost:3000'))

module.exports = app