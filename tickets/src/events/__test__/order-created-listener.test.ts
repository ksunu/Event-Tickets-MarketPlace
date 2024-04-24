import mongoose from 'mongoose'
import { OrderCreatedEvent, OrderStatus } from '@swticket/common'
import { OrderCreatedListener } from '../listeners/order-created-listener'
import { natsWrapper } from '../../nats-wrapper'
import { Ticket } from '../../models/ticket'
import { Message } from 'node-nats-streaming'

const setup = async () => {
  // Create instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client)

  // Create and save a ticket
  const ticket = Ticket.build({
    title: 'Ticket',
    price: 100,
    userId: '12345'
  })
  await ticket.save()

  // Create fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: '1111',
    expiresAt: '121212',
    ticket: {
        id: ticket.id,
        price: ticket.price
    }
  }

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, ticket, data, msg }
}

it('sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message', async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it('publishes a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
  
  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

  expect(data.id).toEqual(ticketUpdatedData.orderId)
})