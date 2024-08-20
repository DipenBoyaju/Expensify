import { RiCopperCoinFill } from "react-icons/ri";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { Link, NavLink } from "react-router-dom";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Sidebar = ({ setSideMenu }) => {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard/'
    },
    {
      id: 2,
      name: 'Budget',
      icon: PiggyBank,
      path: '/dashboard/budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]

  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex justify-between items-center">
        <Link to='/' className="flex items-center gap-1">
          <span><RiCopperCoinFill className=" text-primary text-4xl" /></span><span className="text-2xl font-semibold">Expensify</span>
        </Link>
        <span className="text-xl cursor-pointer hover:text-primary transition-all md:hidden" onClick={() => setSideMenu(false)}><RxCross1 /></span>
      </div>
      <div className="mt-5">
        {
          menuList.map((menu, index) => (
            <NavLink className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center text-primary font-medium p-5 cursor-pointer rounded-md bg-blue-100 mb-2"
                : "flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100"
            } key={index} to={menu.path} end={menu.path === '/dashboard/'} onClick={() => setSideMenu((prev) => !prev)}>
              <menu.icon />
              {menu.name}
            </NavLink>
          ))
        }
      </div>
      <div className="fixed bottom-5 p-5 flex gap-2 items-center text-black">
        <Link to={'https://www.linkedin.com/in/dipen-boyaju-aa877124b/'} target="_blank" className="flex bg bg-primary text-white p-1 text-2xl rounded-md cursor-pointer">
          <CiLinkedin />
        </Link>
        <Link to={'https://github.com/DipenBoyaju'} target="_blank" className="flex bg bg-zinc-800 text-white p-1 text-2xl rounded-md cursor-pointer">
          <FaGithub />
        </Link>
      </div>
    </div>
  )
}
export default Sidebar