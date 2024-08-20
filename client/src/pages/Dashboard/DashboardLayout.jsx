import { Route, Routes } from "react-router-dom"
import DashboardHeader from "./components/DashboardHeader"
import Sidebar from "./components/Sidebar"
import Overview from "./Overview"
import Budget from "./Budget/Budget"
import Expenses from "./Expenses/Expenses"
import ExpenseList from "./Expenses/ExpenseList"
import { useState } from "react"
import Upgraded from "./Upgrade/Upgraded"

const DashboardLayout = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const menuStyle = sideMenu ? 'md:fixed md:w-64 sm:backdrop-blur-xl sm:w-64 sm:fixed md:block z-10 sm:z-20' : 'md:fixed md:w-64 sm:backdrop-blur-xl sm:w-64 hidden md:block z-10 sm:z-20'
  return (
    <div>
      <div className={`${menuStyle}`}>
        <Sidebar setSideMenu={setSideMenu} />
      </div>
      <div className="md:ml-64">
        <DashboardHeader setSideMenu={setSideMenu} />
        <div className="p-5 px-8 lg:px-5">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/upgrade" element={<Upgraded />} />
            <Route path="/expenses/:id" element={<ExpenseList />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout