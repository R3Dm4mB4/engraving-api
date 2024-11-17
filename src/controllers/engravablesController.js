import Engravables from '../models/Engravables.js'
import { handleUpload } from '../utils/cloudinary.js'

export const newProduct = async (req, res) => {
  const { name, price, code } = req.body
  const files = req.files
  try {
    const imageUrls = await handleUpload(files, 'engravable_products')
    const newEngravable = new Engravables({
      name,
      price,
      code,
      imageUrls
    })
    await newEngravable.save()
    res.status(200).json({ msg: 'New product registered' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

export const updateProduct = async (req, res) => {
  const { name, price, code } = req.body
  const { id } = req.query
  try {
    const updatedProduct = await Engravables.findByIdAndUpdate(id, {
      $set: { name, price, code }
    })
    res.status(200).json({ msg: 'Product updated!', product: updatedProduct })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Engravables.find()
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

