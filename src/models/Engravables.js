import { Schema, model } from 'mongoose'

const EngravablesSchema = new Schema({
  name:                { type: String, default: '' },
  price:               { type: Number, default: 0 },
  code:                { type: String, default: '' },
  stock:               { type: Number, default: 0 },
  minStock:            { type: Number, default: 0 },
  bothSidesEngravable: { type: Boolean, default: false },
  imageUrl :           { type: String, default: '' }
})

export default model('Engravables', EngravablesSchema)