import { CiCirclePlus } from "react-icons/ci";
import AddBudgetForm from "./AddBudgetForm";
import { useState } from "react";

const CreateBudget = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 z-10 border-dashed cursor-pointer hover:shadow-md" onClick={() => setShowForm((prev) => !prev)}>
        <h2 className="text-3xl"><CiCirclePlus /></h2>
        <h2>Create New Budget</h2>
      </div>
      {showForm ?
        <div className="absolute z-50 bg-[#000000d8] w-full h-full top-0 left-0">
          <AddBudgetForm setShowForm={setShowForm} />
        </div> :
        ''
      }
    </>
  )
}
export default CreateBudget