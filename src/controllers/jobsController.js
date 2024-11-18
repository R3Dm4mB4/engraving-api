import vine from '@vinejs/vine'
import Jobs from '../models/Jobs.js'
import { handleUpload } from '../utils/cloudinary.js'
import { validateReqBody } from '../utils/utils.js'

// Vine schemas will only be used to validate body from HTTP request,
// some values from mongoose schemas may be missing
const jobSchema = vine.object({
  notes: vine.string(),
  store: vine.string(),
  totalPrice: vine.number(),
  customerInfo: vine.object({
    phone: vine.string(),
    name: vine.string()
  }),
  productInfo: vine.object({
    productCode: vine.string(),
  }),
  salesRepName: vine.string()
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

export const createJob = async(req, res) => {
  const files = req.files
  try {
    const {
      notes,
      store,
      totalPrice,
      customerInfo,
      productInfo,
      salesRepName
    } = await validateReqBody(req.body, jobSchema)

    // Before job is created, the item file(s) must be uploaded so it 
    // will be available for preview
    const itemsUrls = await handleUpload(files, 'jobs')

    const newJob = new Jobs({
      notes,
      store,
      totalPrice,
      customerInfo,
      productInfo: {
        productCode: productInfo.productCode,
        engravablesImages: itemsUrls
      },
      salesRepName
    })
    const response = await newJob.save()
    res.status(200).json({ msg: 'New job created', details: response })
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
