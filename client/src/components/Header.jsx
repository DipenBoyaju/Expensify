import { RiCopperCoinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApi";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "../features/auth/authSlice";
import { persistor } from "../app/store";

const Menu = ({ setShowMenu }) => {
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      if (response.status === 'success') {
        setShowMenu(false)
        dispatch(removeCredentials());
        persistor.purge();

        toast.success(response.message, {
          position: "top-right"
        });
      }
    } catch (error) {
      console.log('logout error:', error);
      toast.error(error.data?.message || 'An error occurred', {
        position: "top-right"
      });
    }
  }
  return (
    <div className="absolute right-0 top-16 bg-white border p-2 rounded-sm text-left">
      <div className="flex flex-col">
        <Link className="flex items-center gap-2 hover:bg-primary hover:text-white p-3 rounded-sm transition-all" to={'/dashboard'}><MdDashboard />Dashboard</Link>
        <hr />
        <button className="flex items-center gap-2 hover:bg-primary hover:text-white p-3 rounded-sm transition-all" onClick={handleLogout}><IoLogOut /> Logout</button>
      </div>
    </div>
  )
}

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className="flex justify-between items-center border-b border-zinc-300 p-4">
      <div className="">
        <Link to={'/'} className="flex items-center gap-1">
          <span><RiCopperCoinFill className=" text-primary text-4xl" /></span><span className="text-2xl font-semibold">Expensify</span></Link>
      </div>
      <div className="">
        {
          !currentUser ?
            <Link to='/signin'>
              <button className="bg-primary text-white p-2 px-5 hover:bg-blue-800 rounded-md text-sm">Get Started</button>
            </Link> :
            <div className=" flex gap-2 items-center">
              <h1 className="text-lg">Welcome, <span className="font-semibold text-primary">{currentUser.username}</span></h1>
              <span onClick={() => setShowMenu((prev) => !prev)} className="bg-primary text-white h-10 w-10 text-lg text-center rounded-lg border-2 border-blue-600 uppercase font-bold pt-1 cursor-pointer">{currentUser.username.charAt(0)}</span>
            </div>
        }
      </div>
      {
        showMenu ?
          <Menu setShowMenu={setShowMenu} /> :
          ''
      }
    </header>
  )
}
export default Header