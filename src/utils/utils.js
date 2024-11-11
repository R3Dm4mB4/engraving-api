import { cloudinaryConfig }  from './cloudinary.js'

export const uploadFiles = async (files) => {
  const urls = []
  for (const file in files) {
    const { secure_url } = await cloudinaryConfig.upload(file)
    urls.push(secure_url)
  }
  return urls
}

const errorHandler = (code, details) => {

}
