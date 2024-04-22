import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@swticket/common'
import { body } from 'express-validator'
import { Ticket } from '../../models/ticket'
import { Order } from '../../models/order'

const router = express.Router()

// 15 minutes to expire ordering ticket
const EXPIRATION_IN_SECONDS = 15 * 60

router.post('/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
      .withMessage('TicketId must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body

    // Find ticket user is trying to order in DB
    const ticket = await Ticket.findById(ticketId)
    if (!ticket) throw new NotFoundError()

    // Make sure ticket is not already reserved
    const isReserved = await ticket.isReserved()
    if (isReserved) throw new BadRequestError('Ticket is already reserved')

    // Calculate expiration date
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_IN_SECONDS)

    // Build order and save to DB
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket
    })
    await order.save()

    // Publish event of order created


    res.status(200).send(order)
  }
)

export { router as newOrderRouter }