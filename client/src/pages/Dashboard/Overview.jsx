import { useCheckUserQuery } from "../../features/auth/authApi";
import { useGetBudgetQuery } from "../../features/Budget/budgetApi";
import BudgetItem from "./Budget/BudgetItem";
import BudgetCardLoader from "./Budget/components/BudgetCardLoader";
import BarchartDashboard from "./Overview/BarchartDashboard";
import CardInfo from "./Overview/CardInfo";
import CardLoader from "./Overview/component/CardLoader";
import LatestExpense from "./Overview/LatestExpense";

const Overview = () => {
  const { data } = useCheckUserQuery();
  const { data: budgets, isLoading } = useGetBudgetQuery();
  return (
    <div className='py-5'>
      <div className="pb-5">
        <h2 className="font-bold text-3xl">Hi, {data?.user?.username}</h2>
        <p className='text-gray-500'>Here&apos;s what happening with your money, Let&apos;s Manage your expense.</p>
      </div>
      {
        isLoading ?
          <CardLoader /> :
          <CardInfo budget={budgets} />
      }
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
        <div className="md:col-span-2 flex flex-col gap-6">
          <BarchartDashboard budgets={budgets} />
          <LatestExpense />
        </div>
        <div className="">
          <h2 className='font-bold text-lg pb-2'>Latest Budgets</h2>
          {
            isLoading ?
              <div className="flex flex-col gap-5">
                <BudgetCardLoader />
                <BudgetCardLoader />
                <BudgetCardLoader />
                <BudgetCardLoader />
                <BudgetCardLoader />
              </div> : ''
          }
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              {
                !budgets || !budgets.data || budgets.data.length === 0 ?
                  (<h2>No Budget found</h2>) :
                  ([...budgets.data]  // Create a new array to avoid mutating the original data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
                    .map((budget) => (
                      <BudgetItem key={budget._id} budget={budget} />
                    )))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Overview