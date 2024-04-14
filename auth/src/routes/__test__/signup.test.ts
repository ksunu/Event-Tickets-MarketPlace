import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: '12345'
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: ''
    })
    .expect(400)
})

it('returns a 400 with an missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({
      password: '1234'
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(201)
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(400)
})

it('sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(201)
  
  expect(response.get('Set-Cookie')).toBeDefined()
})