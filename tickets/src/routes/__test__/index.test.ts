import request from 'supertest'
import { app } from '../../app'

const createTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'ticket',
      price: 30
    })
}

it('can fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)
  
  expect(response.body.length).toEqual(3)
})