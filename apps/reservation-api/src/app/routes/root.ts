import { FastifyInstance } from 'fastify'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API for reservations' }
  })

  // endpoint to help populate database
  fastify.post('/restaurant', async function () {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: 'The Butchers daughter',
        endorsements: {
          create: [
            { name: "VEGAN" },
            { name: "VEGETARIAN" },
            { name: "PALEO" },
          ],
        },
        tables: {
          create: [
            { capacity: 2},
            { capacity: 4},
          ]
        }
      }
    })
    console.log(`created a restaurant ->`)
    console.log(restaurant)
    return { message: 'you created a restaurant' }
  })
}
