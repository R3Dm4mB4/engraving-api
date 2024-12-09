import { env } from '../config/envConf.js'
import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}

export const authorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'No token provided' })
    }
    if (!roles.includes(req.user.role)) {
      return res.json(403).json({ msg: 'Unauthorized' })
    }
    next()
  }
}