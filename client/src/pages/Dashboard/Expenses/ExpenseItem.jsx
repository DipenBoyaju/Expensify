import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetExpenseQuery } from "../../../features/Expense/ExpenseApi";

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ExpenseItem = ({ budget }) => {

  const [bgColor, setBgColor] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(budget.amount);

  const { data: expenses } = useGetExpenseQuery(budget._id);
  const nav = useNavigate();

  useEffect(() => {
    if (expenses && expenses.data) {
      const totalAmount = expenses.data.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalSpent(totalAmount);
      setTotalItems(expenses.data.length);
      setRemainingAmount(budget.amount - totalAmount)
    }
  }, [expenses]);

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  const progressBarWidth = budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;


  return (
    <div className="p-5 border rounded-lg cursor-pointer" onClick={() => nav(`/dashboard/expenses/${budget._id}`)}>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 text-white rounded-full font-bold" style={{ backgroundColor: bgColor }}>
            {budget.name.charAt(0).toUpperCase()}
          </h2>
          <div className="">
            <h2 className="capitalize">{budget.name}</h2>
            <h2>{totalItems} item{totalItems !== 1 ? 's' : ''}</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex ic justify-between mb-3">
          <h2 className="text-xs text-slate-400">${totalSpent} Spent</h2>
          <h2 className="text-xs text-slate-400">${remainingAmount} Remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${progressBarWidth}%` }}></div>
        </div>
      </div>
    </div>
  )
}
export default ExpenseItem