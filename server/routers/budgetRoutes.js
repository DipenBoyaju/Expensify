import express from 'express';
import { createBudget, deleteBudget, editBudget, getBudgetById, getBudgets } from '../controllers/budgetController.js';
import { verifyUser } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/createbudget').post(verifyUser, createBudget);
router.route('/getbudget').get(verifyUser, getBudgets);
router.route('/getbudget/:id').get(verifyUser, getBudgetById);
router.route('/editbudget/:id').patch(verifyUser, editBudget);
router.route('/deletebudget/:id').delete(verifyUser, deleteBudget);

export default router;

