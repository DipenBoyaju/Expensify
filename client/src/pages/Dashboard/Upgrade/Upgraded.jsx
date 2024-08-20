import { useState } from "react";
import UpgradeCard from "./UpgradeCard"
import { IoAlertCircleOutline } from "react-icons/io5";
import { RiCopperCoinFill } from "react-icons/ri";

const Upgraded = () => {
  const [activePlan, setActivePlan] = useState(null);
  return (
    <div className="">
      <div className="pb-4">
        <h2 className="text-xl font-semibold">Select Plan</h2>
        <p className="text-gray-500 font-light">Simple and flexible per user price.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        <UpgradeCard price='0' title="Free" isActive={activePlan === "Free"} onClick={() => setActivePlan("Free")} status='Current Plan' />
        <UpgradeCard price='29' title="Standard" isActive={activePlan === "Standard"} onClick={() => setActivePlan("Standard")} status='Upgrade' />
        <UpgradeCard price='49' title='Pro' isActive={activePlan === "Pro"} onClick={() => setActivePlan("Pro")} status="Upgrade" />
      </div>
      <div className="bg-blue-50 p-5 rounded-lg font-light border-2 border-cyan-200 mt-10 flex gap-2">
        <span className="text-cyan-500 text-xl pt-1"><IoAlertCircleOutline /></span>
        <p className="text-zinc-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In cumque fugit dolore architecto dolores magni et maiores blanditiis reprehenderit earum.</p>
      </div>
      <div className="flex items-center gap-1 justify-center mt-6 bg-primary text-white p-4 rounded-full shadow-2xl">
        <span><RiCopperCoinFill className=" text-white text-4xl" /></span><span className="text-2xl font-semibold">Expensify</span>
      </div>
    </div>
  )
}
export default Upgraded