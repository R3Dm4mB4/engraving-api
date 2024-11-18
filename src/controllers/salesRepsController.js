import SalesReps from '../models/SalesReps.js'

export const getSalesReps = async (req, res, next) => {
  try {
    const salesReps = await SalesReps.find()
    res.status(200).json({ salesReps })
  } catch (error) {
    next(error)
  }
}

export const registerSalesRep = async (req, res, next) => {
  const { name } = req.body
  try {
    const newSalesRep = new SalesReps({ name })
    const response = await newSalesRep.save()
    res.status(200).json({ newSalesRep: response })
  } catch (error) {
    next(error)
  }
}