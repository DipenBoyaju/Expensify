import { toast } from "react-toastify";
import { useDeleteBudgetMutation } from "../../../../features/Budget/budgetApi";
import { useNavigate } from "react-router-dom";

const DeletePopup = ({ setDeletePopup, budgetId, budgetName }) => {

  const [deleteBudget] = useDeleteBudgetMutation();
  const nav = useNavigate()

  const handleDelete = async () => {
    try {
      const response = await deleteBudget(budgetId).unwrap();


      if (response.status === 'success') {
        console.log(response.message);
        nav('/dashboard/expenses')
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
    <div className="w-[60vw] lg:w-[30vw] shadow-2xl m-auto p-6 bg-white translate-y-[50%] rounded-md outline outline-zinc-300 space-y-8">
      <div className="text-left space-y-3">
        <h2 className="text-lg text-left">Are you absolutely sure?</h2>
        <hr />
        {/* <span className="text-primary font-semibold ">{budgetName}</span> */}
        <p className="text-sm text-slate-400">This action cannot be undone. Thi will permanently delete your current budget along with expenses and remove your data from our servers.</p>
      </div>
      <div className="flex justify-end gap-2">
        <button className="border text-md p-1 px-4 rounded-md" onClick={() => setDeletePopup(false)}>Cancel</button>
        <button className="bg-primary text-white border border-primary text-md p-1 px-4 rounded-md" onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  )
}
export default DeletePopup