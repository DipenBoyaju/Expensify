import Budget from "../models/BudgetModel.js";
import Expense from "../models/ExpenseModel.js";

export const createBudget = async (req, res) => {
  const { name, amount } = req.body;

  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  if (!name || !amount) {
    return res.status(400).json({
      status: 'error',
      message: 'Name and amount are required',
    });
  }

  try {
    const newBudget = new Budget({
      name,
      amount,
      user: userId,
    });

    await newBudget.save();

    res.status(201).json({
      status: 'success',
      message: 'Budget Added Successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error Creating budget'
    })
  }
}

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json({
      status: 'success',
      data: budgets,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'success',
      message: error,
    })
  }
}

export const getBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id).where({ user: req.user.id });

    if (!budget) {
      return res.status(404).json({
        status: 'error',
        message: 'Budget not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: budget,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching budget',
    });
  }
};

export const editBudget = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { name, amount },
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({
        status: 'error',
        message: 'Budget not found or unauthorized',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Budget updated successfully',
      data: updatedBudget,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error Editing budget',
    });
  }
}

export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.deleteMany({ budget: id, user: req.user.id })
    const response = await Budget.findOneAndDelete({ _id: id, user: req.user.id });

    if (!response) {
      return res.status(404).json({
        status: 'error',
        message: 'Budget not found or unauthorized',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Budget deleted successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting budget',
    });
  }
}