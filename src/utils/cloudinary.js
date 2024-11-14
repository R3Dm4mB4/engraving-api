import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Structure to upload files using this function is:
 * const cloudinary = require('/this_file')
 * const { secure_url } = await cloudinary.uploader.upload(file, options)
 */
export const cloudinaryConfig = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  })
  return cloudinary
}