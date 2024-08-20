import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { useEditBudgetMutation, useGetBudgetByIdQuery } from "../../../../features/Budget/budgetApi";


const EditBudget = ({ setEditMenu, budgetId }) => {
  const [editBudget] = useEditBudgetMutation();
  const { data: budget } = useGetBudgetByIdQuery(budgetId);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  })

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget?.data.name || '',
        amount: budget?.data.amount || '',
      });
    }
  }, [budget]);


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
      const response = await editBudget({ id: budgetId, ...formData }).unwrap();

      if (response.status === 'success') {
        console.log(formData);

        console.log(response.message);
        toast.success(response.message, {
          position: "top-right"
        });
        setFormData({ name: '', amount: '' });
        setEditMenu(false);
      }
    } catch (error) {
      console.log('Adding bufget:', error);
      toast.error(error.message, {
        position: "top-right"
      });
    }
  }

  return (
    <div className="w-[60vw] lg:w-[30vw] shadow-2xl m-auto p-6 bg-white translate-y-[50%] rounded-md outline outline-zinc-300">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-semibold text-lg">Edit Budget</h2>
        <div className="text-black text-2xl cursor-pointer" onClick={() => setEditMenu(false)}>
          <RxCross2 />
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h2 className="text-black font-medium my-1">Budget Name</h2>
            <input type="text" placeholder="e.g. Home Decor" name="name" onChange={handleChange} value={formData.name} className="border p-3 w-full" />
          </div>
          <div className="">
            <h2 className="text-black font-medium my-1">Budget Amount</h2>
            <input type="number" placeholder="e.g. 5000$" name="amount" onChange={handleChange} value={formData.amount} className="border p-3 w-full" />
          </div>
          <button type="submit" className="mt-5 w-full bg-primary text-white rounded-sm p-2">Edit Budget</button>
        </form>
      </div>
    </div >
  )
}
export default EditBudget