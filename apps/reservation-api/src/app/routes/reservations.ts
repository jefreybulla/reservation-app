import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PrismaClient } from '@prisma/client'

import { DateTime, Duration } from 'luxon'

let revervationDuration = Duration.fromObject({ hours: 2 })

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
    const dt = DateTime.fromISO(new Date(reservationDateTime).toISOString())

    // First check if there is a reservation for that table at that time
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        tableId,
        dateTime: {
            lte: dt.plus(revervationDuration).toISO(),
            gte: dt.minus(revervationDuration).toISO()
        }
      }
    })
    if (existingReservation) {
      return reply.code(400).send({ message: 'reservation conflict for the requested table' })
    }

    const reservation = await prisma.reservation.create({
      data: {
        tableId,
        userId,
        dateTime: new Date(reservationDateTime)
      }
    })

    return { message: 'you created a reservation', confirmedReservation: reservation }
  })
}