const BudgetCardLoader = () => {
  return (
    <div>
      <div className="p-5 border rounded-lg cursor-pointer animate-pulse">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="h-14 w-12 bg-slate-300 rounded-full animate-pulse">
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-2 w-32 bg-slate-300 rounded-full animate-pulse"></div>
              <div className="h-2 w-24 bg-slate-300 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="h-6 w-24 bg-slate-300 animate-pulse rounded-full"></div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-1 w-20 bg-slate-300 animate-pulse rounded-full"></div>
            <div className="h-1 w-28 bg-slate-300 animate-pulse rounded-full"></div>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BudgetCardLoader