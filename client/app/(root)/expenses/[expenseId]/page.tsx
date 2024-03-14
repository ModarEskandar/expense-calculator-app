import ExpenseCard from "@/components/shared/ExpenseCard";
import { useGetExpenseById } from "@/lib/react-query/queries";
import { Loader, SquarePlus } from "lucide-react";

export default function ExpenseDetail({
    params,
  }: {
    params: { expenseId: string };
  }) {
    const { data: expense, isPending:isGettingExpense } = useGetExpenseById(params.expenseId);

    return (<div className="flex flex-1">
    <div className="common-container">
      <div className="max-w-5xl flex-start justify-start w-full gap-3">
      <SquarePlus size={40} className="text-purple" />          <h2 className="h3-bold md:h2-bold ">Expense Details</h2>
      </div>
      {isGettingExpense?<Loader/>:<ExpenseCard  expense={expense!}/>}
    </div>
  </div>)
  }