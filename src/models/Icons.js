import { Schema, model } from 'mongoose'

const IconsSchema = new Schema({
  imageUrl: { type: String, default: '' },
  code:     { type: String, default: '' },
  category: { type: String, default: '' }
})

export default model('Icons', IconsSchema)