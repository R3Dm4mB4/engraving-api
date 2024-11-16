import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import streamifier from 'streamifier'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

/**
 * Handles the files from multer to upload to cloudinary
 * @param {*} files Array of files from req.files
 * @param {string} folderName String name of cloudinary folder
 * @returns Array<string> 
 */
export async function handleUpload(files, folderName) {
  const urls = []
  try {
    for (const i in files) {
      const file = files[i]
      const secure_url = await new Promise((resolve, reject) => {
        const cldUploadStream = cloudinary.uploader.upload_stream({
          folder: folderName
        }, (error, result) => {
          if (error) {
            console.error(error)
            reject(error)
          }
          else resolve(result.secure_url)
        })
        streamifier.createReadStream(file.buffer).pipe(cldUploadStream)
      })
      urls.push(secure_url)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
  return urls
}