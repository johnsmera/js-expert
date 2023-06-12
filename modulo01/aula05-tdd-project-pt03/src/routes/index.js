const http = require('http')
const CarService = require('../service/carService')
const { join } = require('path')
const carsDatabase = join(__dirname, './../../database', 'cars.json')
const { once } = require('events')

const routes = {
  '/transactions:post': async (request, response) => {
    const carService = new CarService({ cars: carsDatabase })

    const data = JSON.parse(await once(request, 'data'))

    const transaction = await carService.rent(
      data.customer,
      data.carCategory,
      data.numberOfDays
    )

    response.write(JSON.stringify({ transaction }))
    response.end()
  },
  default: (_, response) => {
    response.writeHead(404)
    response.write('Not found.')
    response.end()
  }
}

function handler(request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default

  return chosen(request, response)
}

const server = http.createServer(handler)

server.listen(3000, () => console.log('server running at', 3000))

module.exports = server