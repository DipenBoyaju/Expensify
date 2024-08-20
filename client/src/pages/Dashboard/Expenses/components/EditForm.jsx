import { useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { toast } from "react-toastify"
import { useGetExpenseByIdQuery, useUpdateExpenseMutation } from "../../../../features/Expense/ExpenseApi"
import { useParams } from 'react-router-dom'

const EditForm = ({ setShowForm, expenseId }) => {

  // const { id: budgetId } = useParams();

  const { data: expense } = useGetExpenseByIdQuery(expenseId);
  const [updateExpense] = useUpdateExpenseMutation();
  console.log(expense?.data?.name);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  })

  useEffect(() => {
    if (expense) {
      setFormData({
        name: expense?.data.name || '',
        amount: expense?.data.amount || '',
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateExpense({ id: expenseId, ...formData }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message, {
          position: "top-right"
        });
        setShowForm(false);
      }
    } catch (error) {
      console.log("Error updating expense:", error);
      toast.error("Failed to update expense. Please try again.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="w-[60vw] lg:w-[30vw] shadow-2xl m-auto p-6 bg-white translate-y-[50%] rounded-md outline outline-zinc-300">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-semibold text-lg">Edit Expense</h2>
        <div className="text-black text-2xl cursor-pointer" onClick={() => setShowForm((prev) => !prev)}>
          <RxCross2 />
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h2 className="text-black font-medium my-1">Expense Name</h2>
            <input type="text" placeholder="e.g. Home Decor" name="name" onChange={handleChange} value={formData.name} className="border p-3 w-full" />
          </div>
          <div className="">
            <h2 className="text-black font-medium my-1">Expense Amount</h2>
            <input type="number" placeholder="e.g. 5000$" name="amount" onChange={handleChange} value={formData.amount} className="border p-3 w-full" />
          </div>
          <button type="submit" className="mt-5 w-full bg-primary text-white rounded-sm p-2">Edit Expense</button>
        </form>
      </div>
    </div >
  )
}
export default EditForm