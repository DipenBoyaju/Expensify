import mongoose from 'mongoose';
import Budget from './BudgetModel.js';
import User from './User.js';

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Budget,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }
}, { timestamps: true })

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;