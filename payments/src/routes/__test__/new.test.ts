import mongoose from 'mongoose'
import request from 'supertest'
import { OrderStatus } from '@swticket/common'
import { app } from '../../app'
import { Order } from '../../models/order'

it('returns 404 when purchasing a non existing order', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdf',
      orderId: new mongoose.Types.ObjectId().toHexString()
    })
    .expect(404)
})

it('returns 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 100,
    status: OrderStatus.Created
  })
  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdf',
      orderId: order.id
    })
    .expect(401)
})

it('returns 400 when purchasing a cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 100,
    status: OrderStatus.Cancelled
  })
  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: 'asdf',
      orderId: order.id
    })
    .expect(400)
})