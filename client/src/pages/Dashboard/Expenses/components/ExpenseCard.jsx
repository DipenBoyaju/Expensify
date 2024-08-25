import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import EditForm from "./EditForm";
import { useState } from "react";
import { useDeleteExpenseMutation } from "../../../../features/Expense/ExpenseApi";
import { toast } from "react-toastify";
import ExpenseListLoader from "./ExpenseListLoader";

const ExpenseCard = ({ expenses, isLoading }) => {
  const [showForm, setShowForm] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState('');
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleEdit = (expenseId) => {
    setCurrentExpenseId(expenseId);
    setShowForm(true);
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await deleteExpense(expenseId).unwrap();

      if (response.status === 'success') {
        console.log(response.message);
        toast.success(response.message, {
          position: "top-right"
        });
      }

    } catch (error) {
      console.log('Deleting Expense:', error);
      toast.error(error.message, {
        position: "top-right"
      });
    }
  }

  return (
    <div className="mt3">
      <div className="grid grid-cols-12 bg-slate-300 p-2 px-4 font-semibold text-lg">
        <h2>S.No</h2>
        <h2 className="col-span-5">Name</h2>
        <h2 className="col-span-2">Amount</h2>
        <h2 className="col-span-2">Date</h2>
        <h2 className="col-span-2">Action</h2>
      </div>
      {
        isLoading ?
          <>
            <ExpenseListLoader />
            <ExpenseListLoader />
            <ExpenseListLoader />
          </> : ''

      }
      {
        !expenses?.data || expenses.data.length === 0 ?
          <p>No expenses found.</p> :
          [...(expenses?.data)]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((expense, index) => (
            <div className="grid grid-cols-12 bg-slate-200 p-2 px-4 items-center" key={expense._id}>
              <h2>{index + 1}</h2>
              <h2 className="col-span-5 text-primary capitalize">{expense.name}</h2>
              <h2 className="col-span-2">${expense.amount}</h2>
              <h2 className="col-span-2">{new Date(expense.createdAt).toLocaleDateString()}</h2>
              <div className="col-span-2">
                <div className="flex flex-row gap-2 text-lg text-white">
                  <span className="bg-green-500 rounded-sm p-1 cursor-pointer" onClick={() => handleEdit(expense._id)}>
                    <MdOutlineEdit />
                  </span>
                  <span className="bg-red-500 rounded-sm p-1 cursor-pointer" onClick={() => handleDelete(expense._id)}>
                    <MdOutlineDelete />
                  </span>
                </div>
              </div>
            </div>
          ))
      }
      {showForm ?
        <div className="absolute z-50 bg-[#000000d8] w-full h-svh top-0 left-0">
          <EditForm setShowForm={setShowForm} expenseId={currentExpenseId} />
        </div> :
        ''
      }
    </div>
  )
}
export default ExpenseCard