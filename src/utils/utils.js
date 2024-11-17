import vine from '@vinejs/vine'

export const validateReqBody = async(data, schema) => {
  return await vine.validate({ schema, data })
}