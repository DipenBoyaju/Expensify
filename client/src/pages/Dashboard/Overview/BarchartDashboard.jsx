import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetAllExpensesQuery } from '../../../features/Expense/ExpenseApi';
import { useGetBudgetQuery } from '../../../features/Budget/budgetApi';

const BarchartDashboard = () => {
  const { data: budgets } = useGetBudgetQuery();
  const { data: expenses } = useGetAllExpensesQuery();

  const combinedData = budgets?.data.map((budget) => {
    const totalSpent = expenses
      ?.data.filter((expense) => expense.budget === budget._id)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      name: budget.name,
      amount: budget.amount,
      Spent: totalSpent || 0,
    };
  }) || [];

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg pb-3'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart data={combinedData} margin={{ top: 7 }}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Spent' stackId='a' fill='#4845d2' />
          <Bar dataKey='amount' stackId='a' fill='#C3C2FF' />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
export default BarchartDashboard