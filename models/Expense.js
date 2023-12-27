// @models/Expense.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
