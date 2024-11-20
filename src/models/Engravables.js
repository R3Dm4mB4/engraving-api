import { Schema, model } from 'mongoose'

const EngravablesSchema = new Schema({
  imageUrls: [String],
  name: String,
  price: Number,
  code: String,
  bothSidesEngravable: Boolean
})

export default model('Engravables', EngravablesSchema)