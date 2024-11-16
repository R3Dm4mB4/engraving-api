import Jobs from '../models/Jobs.js'
import { handleUpload } from '../utils/cloudinary.js'

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
  const { title, store, notes, description } = req.body
  const files = req.files
  try {
    // Before job is created, the item file(s) must be uploaded so it 
    // will be available for preview
    const itemsUrls = await handleUpload(files, 'jobs')

    const newJob = new Jobs({
      title,
      store,
      notes,
      description,
      engravablesPreview: itemsUrls
    })
    const response = await newJob.save()
    res.status(200).json({ msg: 'New job created', details: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error', error })
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
