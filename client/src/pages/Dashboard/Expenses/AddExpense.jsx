import { useState } from "react";
import { toast } from 'react-toastify';
import { useCreateExpenseMutation } from "../../../features/Expense/ExpenseApi";

const AddExpense = ({ budgetId }) => {
  const [createExpense] = useCreateExpenseMutation();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    budgetId: budgetId,
  })

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
      const response = await createExpense(formData).unwrap();

      if (response.status === 'success') {
        console.log(response.message);
        setFormData({ name: '', amount: '', budgetId: budgetId });
        toast.success(response.message, {
          position: "top-right"
        });

      }
    } catch (error) {
      console.log('Adding bufget:', error);
      toast.error(error.message, {
        position: "top-right"
      });
    }

  }

  return (
    <div className="w-full shadow-2xl m-auto p-6 bg-white rounded-md outline outline-zinc-300">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-semibold text-lg">Create New Expense</h2>
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
          <button type="submit" className="mt-5 w-full bg-primary text-white rounded-sm p-2">Create Expense</button>
        </form>
      </div>
    </div >
  )
}
export default AddExpense