import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { NotFoundError, errorHandler, currentUser } from '@swticket/common'
import { createPaymentRouter } from './routes/new'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)
app.use(currentUser)

// Routes
app.use(createPaymentRouter)

app.all('*', async (req, res, next) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }