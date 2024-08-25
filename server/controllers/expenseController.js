import Budget from "../models/BudgetModel.js";
import Expense from "../models/ExpenseModel.js";

export const createExpense = async (req, res) => {
  const { name, amount, budgetId } = req.body;

  const userId = req.user.id;


  if (!userId) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  if (!name || !amount || !budgetId) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, budgetId  and amount are required',
    });
  }

  try {
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({
        status: 'error',
        message: 'Budget not found',
      });
    }

    const totalSpent = await Expense.aggregate([
      { $match: { budget: budgetId } },
      { $group: { _id: "$name", total: { $sum: "$amount" } } }
    ]);

    const totalSpentAmount = totalSpent.length ? totalSpent[0].total : 0;
    const remainingBudget = budget.amount - totalSpentAmount;

    // Check if expense amount exceeds the remaining budget
    if (amount > remainingBudget) {
      return res.status(400).json({
        status: 'error',
        message: 'Expense amount exceeds the remaining budget',
      });
    }

    const newExpense = new Expense({
      name,
      amount,
      user: userId,
      budget: budgetId,
    });

    await newExpense.save();

    res.status(201).json({
      status: 'success',
      message: 'Expense Added Successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error Creating budget'
    })
  }
}

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })

    if (!expenses.length) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({
      status: 'success',
      data: expenses,
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'success',
      message: error,
    })
  }
}

export const getExpensesByBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const expenses = await Expense.find({ budget: id, user: req.user.id });
    if (!expenses.length) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({
      status: 'success',
      data: expenses,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'success',
      message: error,
    })
  }
}

export const getExpensesById = async (req, res) => {
  const { expenseId } = req.params;

  try {
    const expense = await Expense.findOne({ _id: expenseId, user: req.user.id });

    if (!expense) {
      return res.status(404).json({
        status: 'fail',
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}


export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOneAndDelete({ _id: id, user: userId })

    if (!expense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Expense deleted Successfully',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting expense',
    });
  }
}

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;
    const userId = req.user.id;

    const updatedexpense = await Expense.findOneAndUpdate(
      { _id: id, user: userId }, { name, amount },
      { new: true, runValidators: true }
    );

    if (!updatedexpense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found or unauthorized',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Expense Updated Successfully',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error Editing expense',
    });
  }
}
