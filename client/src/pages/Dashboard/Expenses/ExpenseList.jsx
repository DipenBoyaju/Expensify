import { useNavigate, useParams } from "react-router-dom"
import AddExpense from "./AddExpense"
import ExpenseItem from "./ExpenseItem"
import { useGetBudgetByIdQuery } from "../../../features/Budget/budgetApi";
import ExpenseCard from "./components/ExpenseCard";
import { useGetExpenseQuery } from "../../../features/Expense/ExpenseApi";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import EditBudget from "../Budget/components/EditBudget";
import DeletePopup from "../Budget/components/DeletePopup";
import BudgetCardLoader from "../Budget/components/BudgetCardLoader";

const ExpenseList = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBudgetByIdQuery(id);
  const { data: expenses } = useGetExpenseQuery(id);
  const nav = useNavigate();
  const [editMenu, setEditMenu] = useState(false);
  const [deletepopup, setDeletePopup] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error || !data?.data) {
    return <p>Error loading budget details</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <div className="">
          <h1 className="font-bold text-2xl flex items-center gap-2 pb-4"><FaArrowLeft className="cursor-pointer hover:text-primary transition-all" onClick={() => nav(-1)} /> My Expenses</h1>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white rounded-sm text-lg p-1 px-5 cursor-pointer hover:bg-green-400 transition-all" onClick={() => setEditMenu((prev) => !prev)}>Edit</button>
          <button className="bg-red-500 text-white rounded-sm text-md p-1 px-5 cursor-pointer hover:bg-red-400 transition-all" onClick={() => setDeletePopup((prev) => !prev)}>Delete</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="">
          {
            isLoading ?
              <BudgetCardLoader /> : ''
          }
          <ExpenseItem budget={data?.data} expenses={expenses} />
        </div>
        <AddExpense budgetId={id} />
      </div>
      <div className="">
        <div className="mt-5">
          <h2 className="text-xl
             font-semibold pb-2">Expenses List</h2>
          <hr />
          <ExpenseCard expenses={expenses} isLoading={isLoading} />
        </div>
      </div>
      {
        editMenu ?
          <div className="absolute bg-[#000000d8] z-50  w-full h-full bottom-0 left-0">
            <EditBudget setEditMenu={setEditMenu} budgetId={id} />
          </div> :
          ''
      }
      {
        deletepopup ?
          <div className="absolute bg-[#000000d8] z-50  w-full h-full top-0 left-0">
            <DeletePopup setDeletePopup={setDeletePopup} budgetId={id} budgetName={data?.data.name} />
          </div> :
          ''
      }
    </div>
  )
}
export default ExpenseList