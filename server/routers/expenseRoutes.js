import express from 'express';
import { createExpense, deleteExpense, getAllExpenses, getExpenses, getExpensesById, updateExpense } from '../controllers/expenseController.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/createexpenses').post(verifyUser, createExpense);
router.route('/getallexpenses').get(verifyUser, getAllExpenses);
router.route('/getexpenses/:id').get(verifyUser, getExpenses);
router.route('/expenses/:id').delete(verifyUser, deleteExpense);
router.route('/expenses/update/:id').patch(verifyUser, updateExpense);
router.route('/expenses/expense/:expenseId').get(verifyUser, getExpensesById);

export default router;