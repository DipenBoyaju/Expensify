const ExpenseCardLoader = () => {
  return (
    <div>
      <div className="grid grid-cols-12 bg-slate-50 p-2 px-4 items-center">
        <div className="h-2 w-4 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-5 h-2 w-44 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-3 h-2 w-16 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="col-span-3 h-2 w-20 bg-slate-300 rounded-full animate-pulse"></div>

      </div>
    </div>
  )
}
export default ExpenseCardLoader