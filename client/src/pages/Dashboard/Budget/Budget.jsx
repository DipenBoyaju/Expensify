import CreateBudget from "./CreateBudget"
import { useGetBudgetQuery } from "../../../features/Budget/budgetApi";
import BudgetItem from "./BudgetItem";
import BudgetCardLoader from "./components/BudgetCardLoader";


const Budget = () => {
  const { data, isLoading } = useGetBudgetQuery();
  return (
    <div>
      <h1 className="font-bold text-2xl pb-4">My Budgets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget />
        {
          isLoading ?
            <>
              <BudgetCardLoader />
              <BudgetCardLoader />
              <BudgetCardLoader />
              <BudgetCardLoader />
              <BudgetCardLoader />
            </> : ''
        }
        {
          data?.data.map((budget) => (
            <BudgetItem key={budget._id} budget={budget} />
          ))
        }
      </div>
    </div>
  )
}
export default Budget