import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.send('Hi signoutRouter!')
})

export { router as signoutRouter }