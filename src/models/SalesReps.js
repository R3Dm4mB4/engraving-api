import { Schema, model } from 'mongoose'

const SalesRepsSchema = new Schema({
  name: { type: String, default: '' },
})

export default model('SalesReps', SalesRepsSchema)