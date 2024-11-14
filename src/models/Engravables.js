import { Schema, model } from 'mongoose'

const EngravablesSchema = new Schema({
  imageUrls: [String],
  name: String,
  price: Number,
  code: String
})

export default model('Engravables', EngravablesSchema)