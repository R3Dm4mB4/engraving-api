import mongoose, { Schema, model } from 'mongoose'

const JobsSchema = new Schema({
  status:        { type: String, default: 'Received', enum: ['Received', 'Done', 'Cancelled'] },
  notes:         { type: String, default: '' },
  store:         { type: String, default: 'Mall' },
  startedAt:     { type: Date,   default: Date.now },
  finishedAt:    { type: Date,   default: null },
  totalPrice:    { type: Number, default: 0 },
  customerPhone: { type: String, default: '' },
  customerName:  { type: String, default: '' },
  productsIds:   { type: [String], default: [] },
  jobDetails:    {
    iconId:        { type: String, default: '' },
    textToEngrave: { type: String, default: '' },
    textFont:      { type: String, default: '' },
    customDesign:  { type: String, default: '' },
    sideToEngrave: { type: String, default: 'Front', enum: ['Front', 'Backwards', 'Both'] }
  },
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
  const genCode = () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const randNum = Math.floor(100 + Math.random() * 900).toString()

    return`${year}-${month}-${day}-${randNum}` 
  }
  const MAX_ATTEMPTS = 7
  let attempts = 0
  let unique = false
  while (!unique && attempts < MAX_ATTEMPTS) {
    const code = genCode()
    const codeExists = await mongoose.models.Jobs.findOne({ jobCode: code })
    if (!codeExists) {
      this.jobCode = code
      unique = true
    }
    attempts++
  }
  if (!unique) {
    return next(new Error('Unable to generate job unique code'))
  }
  next()
})

export default model('Jobs', JobsSchema)