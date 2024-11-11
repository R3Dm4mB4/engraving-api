import mongoose from 'mongoose'

const JobsSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'Received'
  },
  title: String,
  notes: String,
  store: String,
  description: String,
  startedAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date
  },
  totalPrice: {
    type: Number
  },
  engravablesPreview: [String]
})

export default mongoose.model('Jobs', JobsSchema)