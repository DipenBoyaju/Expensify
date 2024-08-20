const CardLoader = () => {
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-7 border rounded-lg flex items-center justify-between animate-pulse">
        <div className="">
          <div className="h-4 w-64 animate-pulse bg-slate-200 rounded-full"></div>
          <div className="h-6 w-28 bg-slate-400 rounded-full mt-2"></div>
        </div>
        <span className="h-12 w-12 bg-slate-200 animate-pulse rounded-full"></span>
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between animate-pulse">
        <div className="">
          <div className="h-4 w-64 animate-pulse bg-slate-200 rounded-full"></div>
          <div className="h-6 w-28 bg-slate-400 rounded-full mt-2"></div>
        </div>
        <span className="h-12 w-12 bg-slate-200 animate-pulse rounded-full"></span>
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between animate-pulse">
        <div className="">
          <div className="h-4 w-64 animate-pulse bg-slate-200 rounded-full"></div>
          <div className="h-6 w-28 bg-slate-400 rounded-full mt-2"></div>
        </div>
        <span className="h-12 w-12 bg-slate-200 animate-pulse rounded-full"></span>
      </div>
    </div>
  )
}
export default CardLoader