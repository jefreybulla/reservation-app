import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PrismaClient } from '@prisma/client'
import { DateTime, Duration } from 'luxon'

const prisma = new PrismaClient()
let revervationDuration = Duration.fromObject({ hours: 2 })

const RestaurantSearchSchema = Type.Object({
  reservationDateTime:  Type.String({ format: 'date-time' }),
  diet: Type.Optional(Type.Array(Type.String())),
  partySize: Type.Integer({ minimum: 1 })
})

type RestaurantSearchType = Static<typeof RestaurantSearchSchema>

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: RestaurantSearchType }>
  ('/restaurants',
  {
    schema: {
      querystring: RestaurantSearchSchema
    }
  },
  async function (request, reply) {
    const { reservationDateTime, diet, partySize } = request.query
    const dt = DateTime.fromISO(new Date(reservationDateTime).toISOString())

    let dietArray = []
    if (diet) {
      dietArray = diet
    }
    // find restaurants with aviailable tables
    const restaurants = await prisma.restaurant.findMany({
      where: {
        endorsements: {
          hasEvery: dietArray
        },
      },
      // include tables that have no reservations in the desired time window
      include: {
        tables: {
          where: {
            capacity: {
              gte: partySize
            },
            reservations: {
              none: {
                dateTime: {
                  lte: dt.plus(revervationDuration).toISO(),
                  gte: dt.minus(revervationDuration).toISO()
                }
              }
            }
          }
        }
      }
    })

    return { restaurants: restaurants}
  })

}
