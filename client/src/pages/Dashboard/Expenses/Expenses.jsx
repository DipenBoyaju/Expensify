import { useGetBudgetQuery } from "../../../features/Budget/budgetApi";
import BudgetCardLoader from "../Budget/components/BudgetCardLoader";
import ExpenseItem from "./ExpenseItem"

const Expenses = () => {
  const { data, isLoading } = useGetBudgetQuery();
  return (
    <div>
      <h1 className="font-bold text-2xl pb-4">My Expenses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          data?.data.length === 0 ?
            <h2>No Expenses to show</h2> :
            data?.data.map((budget) => (
              <ExpenseItem budget={budget} key={budget._id} />
            ))
        }
      </div>
    </div>
  )
}
export default Expenses