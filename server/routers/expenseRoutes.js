import express from 'express';
import { createExpense, deleteExpense, getAllExpenses, getExpenses, getExpensesById, updateExpense } from '../controllers/expenseController.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/createexpenses').post(createExpense);
router.route('/getallexpenses').get(getAllExpenses);
router.route('/getexpenses/:id').get(getExpenses);
router.route('/expenses/:id').delete(deleteExpense);
router.route('/expenses/update/:id').patch(updateExpense);
router.route('/expenses/expense/:expenseId').get(getExpensesById);

export default router;