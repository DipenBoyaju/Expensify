import express from 'express';
import { createBudget, deleteBudget, editBudget, getBudgetById, getBudgets } from '../controllers/budgetController.js';
import { verifyUser } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/createbudget').post(createBudget);
router.route('/getbudget').get(getBudgets);
router.route('/getbudget/:id').get(getBudgetById);
router.route('/editbudget/:id').patch(editBudget);
router.route('/deletebudget/:id').delete(deleteBudget);

export default router;

