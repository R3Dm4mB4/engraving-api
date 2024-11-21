import vine from '@vinejs/vine'
import { ValidationError } from './error.js'

export const validateReqBody = async(data, schema) => {
  try {
    return await vine.validate({ schema, data })
  } catch (error) {
    console.error("[ERROR:::]", error)
    throw new ValidationError('Invalid Data Format', error)
  }
}