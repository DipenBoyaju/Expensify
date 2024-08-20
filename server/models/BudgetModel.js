import mongoose from 'mongoose'
import User from './User.js';

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }
}, { timestamps: true })

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;