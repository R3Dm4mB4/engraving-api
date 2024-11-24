import vine from '@vinejs/vine'
import jsonwebtoken from 'jsonwebtoken'
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

/**
 * 
 * @param {string} token Got from auth headers.
 * @returns {string} Decoded user id got from payload
 */
export const getIdFromToken = async(token) => {
  // Structure of decoded payload is:
  // user: {
  //  id,
  //  role
  // }
  const decoded = await jsonwebtoken.decode(token)
  return decoded.user.id
}