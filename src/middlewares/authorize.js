import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
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