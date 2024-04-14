import request from 'supertest'
import { app } from '../../app'

it('fails when non existing email is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(400)
})

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(201)
  
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '54321'
    })
    .expect(400)
})

it('responds with a cookie when given a valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(201)
  
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
  
  expect(response.get('Set-Cookie')).toBeDefined()
})
