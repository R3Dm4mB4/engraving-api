import { Schema, model } from 'mongoose'

const EngravablesSchema = new Schema({
  name:                { type: String, default: '' },
  price:               { type: Number, default: 0 },
  code:                { type: String, default: '' },
  bothSidesEngravable: { type: Boolean, default: false },
  imageUrls:           { type: [String], default: [] }
})

export default model('Engravables', EngravablesSchema)