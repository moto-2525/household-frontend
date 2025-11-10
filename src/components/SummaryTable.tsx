import type { Transaction } from "@/types/Transaction";

type Props = {
  transactions: Transaction[];
};


export default function SummaryTable({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === "収入")
    .reduce((sum, t) => sum + t.amount, 0);
    console.log(income);

  const expense = transactions
    .filter((t) => t.type === "支出")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div>
      <h2>💹 集計表</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>項目</th>
            <th>金額</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>収入</td>
            <td>{income.toLocaleString()}円</td>
          </tr>
          <tr>
            <td>支出</td>
            <td>{expense.toLocaleString()}円</td>
          </tr>
          <tr>
            <td>収支差</td>
            <td>{balance.toLocaleString()}円</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}