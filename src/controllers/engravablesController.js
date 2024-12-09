import vine from '@vinejs/vine'
import Engravables from '../models/Engravables.js'
import { handleUpload } from '../utils/cloudinary.js'
import { validateReqBody } from '../utils/utils.js'
import {ValidationError} from "../utils/error.js";

const engravableSchema = vine.object({
  name: vine.string(),
  price: vine.number(),
  code: vine.string(),
  stock: vine.number(),
  minStock: vine.number(),
  bothSidesEngravable: vine.boolean()
})

export const newProduct = async (req, res) => {
  const files = req.files
  try {
    const { name, price, code, stock, minStock, bothSidesEngravable } 
    = await validateReqBody(req.body, engravableSchema)

    // This must always receive just one image. Change for later
    const imageUrls = await handleUpload(files, 'engravable_products')
    const newEngravable = new Engravables({
      name,
      price,
      code,
      bothSidesEngravable,
      imageUrls,
      stock,
      minStock
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
    // This must receive just one image. Change for later
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

// Stock handling below
export const getCurrentStock = async (req, res, next) => {
  const { id } = req.query
  try {
    const product = await Engravables.findOne({ _id: id })
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }
    res.status(200).json({ stock: product.stock })
  } catch (error) {
    next(error)
  }
}

export const verifyStock = async (req, res, next) => {
  // * Structure of products<array> is [{ productId, quantity }]
  const { products } = req.body
  const responsePerProduct = []
  try {
    // * Product structure verification.
    if (!Array.isArray(products) || products.length === 0) {
      throw new ValidationError('Products is not an array or is empty')
    }
    for (const productObj of products) {
      const { productId, quantity } = productObj
      if (!productId || !quantity) {
        responsePerProduct.push({ productId, msg: "Bad array structure" })
        continue
      }
      const product = await Engravables.findById(productId)
      if (!product) {
        responsePerProduct.push({ productId, msg: "Product not found" })
        continue
      }

      if (product.stock < quantity || (product.stock - quantity) < product.minStock || (product.stock - quantity) < 0) {
        responsePerProduct.push({ productId, msg: 'Not enough stock for product' })
      } else {
        await Engravables.findByIdAndUpdate(productId, { $inc: { stock: -quantity } })
      }
      if (responsePerProduct.length > 0) {
        return res.status(400).json({ errors: responsePerProduct })
      }
    }
    res.status(200).json({ msg: 'Stock verified' })
  } catch (error) {
    next(error)
  }
}

