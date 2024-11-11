import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export default await mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfuly connected to database!')
  })
  .catch((error) => console.error('Error trying to connect to database', error))
