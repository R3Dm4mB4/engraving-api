import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  employeeName: {
    type: String,
    default: ''
  }
})

// Authomatically executes before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified(this.password)) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.matchPassword = async function(passwordIn) {
  return await bcrypt.compare(passwordIn, this.password)
}

export default mongoose.model('User', UserSchema)