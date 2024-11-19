import { Schema, model } from 'mongoose'

const JobsSchema = new Schema({
  status:       { type: String, default: 'Received', enum: ['Received', 'In Progress', 'Finished'] },
  notes:        { type: String, default: '' },
  store:        { type: String, default: '' },
  startedAt:    { type: Date,   default: Date.now },
  finishedAt:   { type: Date,   default: null },
  totalPrice:   { type: Number, default: 0 },
  customerInfo: {
    phone: { type: String, default: '' },
    name:  { type: String, default: '' }
  },
  products:     [{
    productCode:        { type: String, default: '' },
    engravePreviewImgs: { type: [String], default: [] }
  }],
  salesRepName: { type: String, default: '' }
}, { minimize: false })

JobsSchema.pre('save', function(next) {
  if (this.status == 'Finished' && !this.finishedAt) {
    this.finishedAt = new Date()
  }
  next()
})

export default model('Jobs', JobsSchema)