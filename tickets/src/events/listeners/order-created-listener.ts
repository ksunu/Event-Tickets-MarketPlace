import { Message } from 'node-nats-streaming'
import { Listener, OrderCreatedEvent, Subjects } from '@swticket/common'
import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated 
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message,) {
    // Find the ticket which is being reserved
    const ticket = await Ticket.findById(data.ticket.id)

    // If no ticket, throw error
    if (!ticket) throw new Error('Ticket not found')

    // Mark the ticket as being reseved by setting its orderId prop
    ticket.set({ orderId: data.id })

    // Save ticket
    await ticket.save()
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId
    })

    // Ack message
    msg.ack()
  }
}