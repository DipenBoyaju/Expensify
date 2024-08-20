import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useGetAllExpensesQuery } from '../../../features/Expense/ExpenseApi';

const CardInfo = ({ budget }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetItem, setBudgetItem] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const { data: expenses } = useGetAllExpensesQuery();

  useEffect(() => {
    if (budget && budget.data) {
      const total = budget.data.reduce((sum, item) => sum + item.amount, 0);
      setTotalBudget(total);
      setBudgetItem(budget.data.length)
    }
  }, [budget])

  useEffect(() => {
    if (expenses && expenses.data) {
      const total = expenses.data.reduce((sum, item) => sum + item.amount, 0);
      setTotalSpent(total);
    }
  }, [expenses])

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div className="">
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">${totalBudget}</h2>
        </div>
        <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div className="">
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">${totalSpent}</h2>
        </div>
        <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div className="">
          <h2 className="text-sm">No. Of Budget</h2>
          <h2 className="font-bold text-2xl">{budgetItem}</h2>
        </div>
        <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
    </div>
  )
}
export default CardInfo