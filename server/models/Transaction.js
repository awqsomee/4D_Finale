const { Schema, model, ObjectId } = require('mongoose')

const Transaction = new Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  quantity: { type: Number },
  currency: { type: String, required: true },
  user: { type: ObjectId, ref: 'User' },
})

module.exports = model('Transaction', Transaction)
