import { Link } from 'react-router-dom'
import { FaRegCheckCircle } from "react-icons/fa";

const UpgradeCard = ({ price, title, isActive, onClick, status }) => {
  return (
    <Link className={`border-2 rounded-lg space-y-4 p-4 cursor-pointer ${isActive ? 'border-primary bg-zinc-50' : 'border-gray-300'}`} onClick={onClick}>
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg pb-6">{title}</h3>
        <FaRegCheckCircle className={`text-xl text-primary ${isActive ? '' : 'hidden'}`} />
      </div>
      <h2 className="font-bold text-4xl">${price} <span className='text-zinc-400 text-sm font-normal'>/month</span></h2>
      <button className={`rounded-md py-2 w-full font-light ${isActive ? 'bg-primary text-white' : 'bg-slate-300'}`}>{status}</button>
    </Link>
  )
}
export default UpgradeCard