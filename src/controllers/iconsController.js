import vine from '@vinejs/vine'
import Icons from '../models/Icons.js'
import { validateReqBody } from '../utils/utils.js'
import { handleUpload } from '../utils/cloudinary.js'

const iconSchema = vine.object({
  code: vine.string(),
  category: vine.string()
})

export const registerIcon = async(req, res, next) => {
  //const files = req.files
  try {
    const { code, category } = await validateReqBody(req.body, iconSchema)
    const imageUrl = 'http://image.com/image1223' // await handleUpload(files, 'not_needed_anymore')
    const newIcon = new Icons({
      code,
      category,
      imageUrl
    })
    const savedIcon = await newIcon.save()
    res.status(200).json({ msg: 'Icon created', icon: savedIcon })
  } catch (error) {
    next(error)
  }
}

export const getAllIcons = async (req, res, next) => {
  try {
    const icons = await Icons.find()
    res.status(200).json({ icons })
  } catch (error) {
    next(error)
  }
}

