import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { body } from 'express-validator';

it('returns a 404 if provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'newTitle',
      price: 60
    })
    .expect(404)
})

it('returns a 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'newTitle',
      price: 60
    })
    .expect(401)
})

it('returns a 401 if use does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'newTitle',
      price: 60
    })
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'updatedTitle',
      price: 1500
    })
    .expect(401)
})

it('returns a 400 if if user provides invalid title or price', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'newTitle',
      price: 60
    })
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 100
    })
    .expect(400)
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updatedTitle',
      price: -100
    })
    .expect(400)
})

it('updates ticket with provided valid input', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'newTitle',
      price: 60
    })
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updatedTitle',
      price: 199
    })
    .expect(200)
  
  const responseTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
  
  expect(responseTicket.body.title).toEqual('updatedTitle')
  expect(responseTicket.body.price).toEqual(199)
})
