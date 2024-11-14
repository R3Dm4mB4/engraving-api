import { Router } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js'
dotenv.config()
const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Wrong credentials' })
    }
    const isValid = await user.matchPassword(password)
    if (!isValid) {
      return res.status(400).json({ msg: 'Wrong credentials' })
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error', error })
  }
})

router.post('/register', async(req, res) => {
  const { email, role, password } = req.body
  try {
    const newUser = new User({
      email,
      role,
      password
    })
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error - Unable to register user', error })
  }
})

export default router