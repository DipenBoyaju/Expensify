import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to={'/'} />
}
export default ProtectedRoutes