import vine from '@vinejs/vine'
import Jobs from '../models/Jobs.js'
import { validateReqBody } from '../utils/utils.js'
import { MakeIo } from '../utils/socketio.js'

// Vine schemas will only be used to validate body from HTTP request,
// some values from mongoose schema may be missing
const jobSchema = vine.object({
  notes: vine.string(),
  store: vine.string(),
  totalPrice: vine.number(),
  transactionCode: vine.string().optional(),
  customerPhone: vine.string(),
  customerName: vine.string(),
  details: vine.array(
    vine.object({ 
      productId: vine.string(),
      iconId: vine.string().optional(),
      textToEngrave: vine.string().optional(),
      textFont: vine.string().optional(),
      customDesign: vine.string().optional(),
      sideToEngrave: vine.string().optional()
    })
  ),
  salesRepName: vine.string(),
  assignedTo: vine.object({
    employeeId: vine.string(),
    employeeName: vine.string()
  })
})

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find()
    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

export const getJobsByDate = async(req, res) => {
  const { startedAt, finishedAt } = req.query
  try {
    const jobs = await Jobs.find({ startedAt, finishedAt })
    if (!jobs) {
      return res.status(500).json({ msg: 'Server error' })
    }
    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ msg: 'server error', error })
  }

}

export const createJob = async(req, res, next) => {
  try {
    const {
      notes,
      store,
      totalPrice,
      customerPhone,
      customerName,
      details,
      salesRepName,
      assignedTo,
      transactionCode
    } = await validateReqBody(req.body, jobSchema)

    const newJob = new Jobs({
      notes,
      store,
      totalPrice,
      customerName,
      customerPhone,
      details,
      salesRepName,
      assignedTo,
      transactionCode
    })
    const response = await newJob.save()
    res.status(200).json({ msg: 'New job created', details: response })
    const io = MakeIo.getIO()
    io.emit('pushJobToList', response)
  } catch (error) {
    next(error)
  }
}

export const updateJob = async (req, res) => {
  const { title, store, notes, description, finishedAt } = req.body
  const { id } = req.query
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, {
      $set: { title, store, notes, description, finishedAt }
    })
    res.status(200).json({ msg: 'Job updated', job: updatedJob })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}
