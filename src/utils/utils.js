import vine from '@vinejs/vine'
import { ValidationError } from './error.js'

/**
 * 
 * @param {*} data Req.body, objects, etc.
 * @param {*} schema Vine object
 * @returns Is true if schema is valid, or exception if invalid.
 */
export const validateReqBody = async(data, schema) => {
  try {
    return await vine.validate({ schema, data })
  } catch (error) {
    console.error(error)
    throw new ValidationError('Invalid Data Format', error)
  }
}
