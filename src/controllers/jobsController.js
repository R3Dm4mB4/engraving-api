import vine from '@vinejs/vine'
import Jobs from '../models/Jobs.js'
import { validateReqBody } from '../utils/utils.js'
import { MakeIo } from '../utils/socketio.js'
import {sendSms} from "../utils/nodemailer.js";
import {takeFromStock} from "./engravablesController.js";

// Vine schemas will only be used to validate body from HTTP request,
// some values from mongoose schema may be missing
const jobSchema = vine.object({
  notes: vine.string(),
  totalPrice: vine.number(),
  transactionCode: vine.string().optional(),
  customerPhone: vine.string(),
  customerName: vine.string(),
  details: vine.array(
    vine.object({ 
      productCode: vine.string(),
      productImg: vine.string(),
      iconImg: vine.string().optional(),
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

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Jobs.find()
    res.status(200).json({ jobs })
  } catch (error) {
    next(error)
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

    const productMap = {}
    for (const currentDetails of details) {
      const productCode = currentDetails.productCode
      productMap[productCode] = (productMap[productCode] || 0) + 1
    }
    const productsObj = Object.keys(productMap).map(productCode => ({
      productCode,
      quantity: productMap[productCode],
    }))

    // Takes from stock and creates job. Implement mongo transactions later
    const result = await takeFromStock(productsObj)
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
    console.error("Err at create job:", error)
    next(error)
  }
}

export const updateJob = async (req, res, next) => {
  const updateData = req.body
  const { id } = req.query
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, { $set: updateData })
    res.status(200).json({ msg: 'Job updated', job: updatedJob })
  } catch (error) {
    next(error)
  }
}

export const updateJobStatus = async (req, res, next) => {
  const { id, status, jobCode, customerPhone } = req.query
  try {
    const updatedJobStatus = await Jobs.findByIdAndUpdate(id, { $set: { status } })
    const resObject = { msg: 'Job status updated', job: updatedJobStatus }
    if (status === 'Done') {
      resObject.smsStatus = await sendSms(customerPhone, jobCode)
    }
    res.status(200).json(resObject)
  } catch (error) {
    next(error)
  }
}