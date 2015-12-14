import mongoose from 'mongoose'
import categorySchema from '../categories/schema'

const productSchema = {
  title: {type: String, required: true},
  summary: String,
  description: String,
  pricing: {
    price: {type: Number, required: true},
    sale_price: Number,
    currency: {
      type: String,
      enum: ['BTC', 'USD', 'EUR', 'GBP'],
      required: true
    }
  },
  qty: {type: Number, required: true},
  images: [{type: String, match: /^https?:\/\//i}],
  categories: [categorySchema],
  featured: Boolean
}

export default new mongoose.Schema(productSchema)
