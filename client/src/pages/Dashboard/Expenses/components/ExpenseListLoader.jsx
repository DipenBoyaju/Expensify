const ExpenseListLoader = () => {
  return (
    <div>
      <div className="grid grid-cols-12 bg-slate-50 p-2 px-4 items-center">
        <div className="h-2 w-4 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-5 h-2 w-44 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-2 h-2 w-14 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-2 h-2 w-16 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="flex flex-row gap-2 w-20">
          <div className="col-span-2 h-6 w-6 bg-slate-300 rounded-sm animate-pulse"></div>
          <div className="col-span-2 h-6 w-6 bg-slate-300 rounded-sm animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
export default ExpenseListLoader