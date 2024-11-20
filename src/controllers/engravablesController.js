import Engravables from '../models/Engravables.js'
import { handleUpload } from '../utils/cloudinary.js'

export const newProduct = async (req, res) => {
  const { name, price, code, bothSidesEngravable } = req.body
  const files = req.files
  try {
    const imageUrls = await handleUpload(files, 'engravable_products')
    const newEngravable = new Engravables({
      name,
      price,
      code,
      bothSidesEngravable,
      imageUrls
    })
    const created = await newEngravable.save()
    res.status(200).json({ msg: 'New product registered', product: created })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

export const updateProduct = async (req, res) => {
  let { name, price, code, bothSidesEngravable, imageUrls } = req.body
  const { id } = req.query
  const files = req.files
  try {
    if (files && files.length > 0) {
      const newUrls = await handleUpload(files, 'engravable_products')
      imageUrls = newUrls
    }
    const updatedProduct = await Engravables.findByIdAndUpdate(id, {
      $set: { name, price, code, bothSidesEngravable, imageUrls }
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query
    await Engravables.findOneAndDelete({ _id: id })
    res.status(200).json({ msg: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

