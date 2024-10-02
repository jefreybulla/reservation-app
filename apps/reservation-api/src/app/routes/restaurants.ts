import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PrismaClient } from '@prisma/client'
import { DateTime, Duration } from 'luxon'

const prisma = new PrismaClient()
let revervationDuration = Duration.fromObject({ hours: 2 })

const RestaurantSearchSchema = Type.Object({
  reservationDateTime:  Type.Optional(Type.String({ format: 'date-time' })),
  diet: Type.Optional(Type.Array(Type.String())),
  partySize: Type.Integer({ minimum: 1 })
})

type RestaurantSearchType = Static<typeof RestaurantSearchSchema>

  /*TO-DO: add search enpoint
  GET /restaurants/reservation-datetime:XYZ&diet=vegan&diet=paleo
  response {
    restaurants[]
    diet[]
    availableTime DateTime
  }
  include types and validation using typebox
  */

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


/*
# Availability calculator
For every restaurant that fit criteria
  for every table in restaurant that has desired capacity or greater
    if no reservation related to this table in the desired time - 2 hours window
      Example: reservation at 6PM. Check if there is a reservation between 4PM and 8PM
      add this restaurant to response array
      break
*/