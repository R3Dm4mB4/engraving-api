import { Schema, model } from 'mongoose'

const JobsSchema = new Schema({
  status:        { type: String, default: 'Received', enum: ['Received', 'Done', 'Cancelled'] },
  notes:         { type: String, default: '' },
  store:         { type: String, default: 'Mall' },
  startedAt:     { type: Date,   default: Date.now },
  finishedAt:    { type: Date,   default: null },
  totalPrice:    { type: Number, default: 0 },
  customerPhone: { type: String, default: '' },
  customerName:  { type: String, default: '' },
  details:      [{
    productId:     { type: String, default: '' },
    iconId:        { type: String, default: '' },
    textToEngrave: { type: String, default: '' },
    textFont:      { type: String, default: '' },
    customDesign:  { type: String, default: '' },
    sideToEngrave: { type: String, default: 'Front', enum: ['Front', 'Backwards', 'Both', 'Custom'] }
  }],
  salesRepName:  { type: String, default: '' },
  assignedTo:     {
    employeeId:   { type: String, default: '' },
    employeeName: { type: String, default: '' }
  },
  jobCode:       { type: String, unique: true }
}, { minimize: false })

JobsSchema.pre('save', function(next) {
  if (this.status == 'Done' && !this.finishedAt) {
    this.finishedAt = new Date()
  }
  next()
})

JobsSchema.pre('save', async function(next) {
  if (this.jobCode && !this.isNew) {
    return next()
  }
  try {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const dateString = `${year}-${month}-${day}`
    
    const lastJob = await model('Jobs').findOne({ jobCode: { $regex: `^${dateString}` } })
      .sort({ jobCode: -1 })
      .exec()
    
    let seqNumber = '001'

    if (lastJob && lastJob.jobCode) {
      const lastSeq = parseInt(lastJob.jobCode.split('-').pop(), 10)
      const nextSeq = lastSeq + 1
      seqNumber = nextSeq.toString().padStart(3, '0')
    }
    
    this.jobCode = `${dateString}-${seqNumber}`
    next()
  } catch (error) {
    next(error)
  }
})

export default model('Jobs', JobsSchema)