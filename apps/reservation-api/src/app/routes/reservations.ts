
/*
endpoint to create a reservation

POST /reservations
body {
  tableId:
  userId
  reservationDateTime:
}
*/


import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ReservationSchema = Type.Object({
  tableId: Type.Integer(),
  userId: Type.Integer(),
  reservationDateTime: Type.String({ format: 'date-time' })
})

type ReservationType = Static<typeof ReservationSchema>

export default async function (fastify: FastifyInstance) {
  fastify.post<{ Body: ReservationType }>('/reservations', {
    schema: {
      body: ReservationSchema
    }
  }, async function (request, reply) {
    const { tableId, userId, reservationDateTime } = request.body
    console.log('tableId ->')
    console.log(tableId)
    console.log('userId ->')
    console.log(userId)
    console.log('reservationDateTime ->')
    console.log(reservationDateTime)

    const reservation = await prisma.reservation.create({
      data: {
        tableId,
        userId,
        dateTime: new Date(reservationDateTime)
      }
    })
    console.log(`created a reservation ->`)
    console.log(reservation)
    return { message: 'you created a reservation' }
  })
}