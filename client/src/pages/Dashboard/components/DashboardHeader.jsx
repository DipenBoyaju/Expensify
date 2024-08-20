import { useState } from "react";
import { useCheckUserQuery, useLogoutMutation } from "../../../features/auth/authApi";
import { IoLogOut } from "react-icons/io5";
import { toast } from "react-toastify";
import { removeCredentials } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgMenuCheese } from "react-icons/cg";

const Menu = () => {
  const [logout] = useLogoutMutation()
  const nav = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      if (response.status === 'success') {
        // setShowMenu(false)
        dispatch(removeCredentials(''));
        console.log(response.message);
        nav('/')
        window.location.reload();
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
    <div className="absolute right-0 top-20 bg-white border p-2 rounded-sm text-left">
      <div className="flex flex-col">
        <button className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 px-4 rounded-sm transition-all" onClick={handleLogout}><IoLogOut /> Logout</button>
      </div>
    </div>
  )
}

const DashboardHeader = ({ setSideMenu }) => {
  const { data } = useCheckUserQuery();
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="lg:hidden text-2xl cursor-pointer hover:text-primary transition-all hover:scale-110 duration-500" onClick={() => setSideMenu((prev) => !prev)}><CgMenuCheese /></span>
        <h1 className="capitalize font-semibold text-lg">Manage your expense 💸 💰</h1>
      </div>
      <div className=" flex gap-2 items-center">
        <h1 className="text-lg">Welcome, <span className="font-semibold text-primary">{data?.user?.username}</span></h1>
        <span onClick={() => setShowMenu((prev) => !prev)} className="bg-primary text-white h-10 w-10 text-lg text-center rounded-lg border-2 border-blue-600 uppercase font-bold pt-1 cursor-pointer">{data?.user?.username.charAt(0)}</span>
      </div>
      {
        showMenu ?
          <Menu /> :
          ''
      }
    </div>
  )
}
export default DashboardHeader