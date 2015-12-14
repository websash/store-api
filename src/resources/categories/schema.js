import mongoose from 'mongoose'

export const categorySchema = {
  _id: {type: String, required: true},
  path: {type: [String], index: true, required: true, ref: 'Category'},
  parent: {type: String, index: true, required: true, default: null, ref: 'Category'}
}

export default new mongoose.Schema(categorySchema)
