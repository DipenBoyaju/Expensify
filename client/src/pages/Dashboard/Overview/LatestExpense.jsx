import { useGetAllExpensesQuery } from "../../../features/Expense/ExpenseApi"
import ExpenseCardLoader from "../Expenses/components/ExpenseCardLoader";

const LatestExpense = () => {
  const { data: expenses, isLoading } = useGetAllExpensesQuery()
  const sortedExpenses = [...(expenses?.data || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  return (
    <div>
      <h2 className='font-bold text-lg pb-3'>LatestExpense</h2>
      <div className="">
        <div className="grid grid-cols-12 bg-slate-100 p-2 px-4 font-semibold text-lg">
          <h2>S.No</h2>
          <h2 className="col-span-5">Name</h2>
          <h2 className="col-span-3">Amount</h2>
          <h2 className="col-span-3">Date</h2>
        </div>
        {
          isLoading ?
            <div className="flex
             flex-col gap-2">
              <ExpenseCardLoader />
              <ExpenseCardLoader />
              <ExpenseCardLoader />
              <ExpenseCardLoader />
              <ExpenseCardLoader />
            </div> :
            ''
        }
        {
          sortedExpenses.length === 0 ?
            <p>No expenses found.</p> :
            sortedExpenses.map((expense, index) => (
              <div className="grid grid-cols-12 bg-slate-50 p-2 px-4 items-center" key={expense._id}>
                <h2>{index + 1}</h2>
                <h2 className="col-span-5 text-primary capitalize">{expense.name}</h2>
                <h2 className="col-span-3">${expense.amount}</h2>
                <h2 className="col-span-3">{new Date(expense.createdAt).toLocaleDateString()}</h2>

              </div>
            ))
        }
      </div>
    </div>
  )
}
export default LatestExpense