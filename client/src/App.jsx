import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PublicRoute from "./features/routes/PublicRoute"
import ProtectedRoutes from "./features/routes/ProtectedRoutes"
import DashboardLayout from "./pages/Dashboard/DashboardLayout"
import Overview from "./pages/Dashboard/Overview"
import Budget from "./pages/Dashboard/Budget/Budget"
import Expenses from "./pages/Dashboard/Expenses/Expenses"
import ExpenseList from "./pages/Dashboard/Expenses/ExpenseList"
import Upgraded from "./pages/Dashboard/Upgrade/Upgraded"

const App = () => {
  const router = createBrowserRouter([
    { index: true, element: <HomePage /> },
    {
      element: <PublicRoute />,
      children: [
        { path: '/signin', element: <Login /> },
        { path: '/signup', element: <Signup /> }
      ]
    },

    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/dashboard/*', element: <DashboardLayout />,
          children: [
            { index: true, element: <Overview /> },
            { path: 'budget', element: <Budget /> },
            { path: 'expenses', element: <Expenses /> },
            { path: 'expenses:id', element: <ExpenseList /> },
            { path: 'upgrade', element: <Upgraded /> }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
export default App