import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi currentUserRouter!')
})

export { router as currentUserRouter }