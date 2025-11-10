"use client";

import type { Transaction } from "@/types/Transaction";
import { useRouter } from "next/navigation";

type Props = {
  transaction: Transaction;
  onClick?: (t: Transaction) => void;
};

export default function TransactionRow({ transaction, onClick }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(transaction);
    } else {
      router.push(`/transactions/${transaction.id}`);
    }
  };

  return (
    <tr
      onClick={handleClick}
      className="cursor-pointer hover:bg-gray-100 transition"
    >
      {/* ✅ ID は短いので最小幅 */}
      <td className="min-w-[40px]">{transaction.id}</td>

      {/* ✅ 日付を広めに（改行しない） */}
      <td className="min-w-[120px] whitespace-nowrap">{transaction.date}</td>

      {/* ✅ 種別は短いのでこのぐらい */}
      <td className="min-w-[80px] whitespace-nowrap">{transaction.type}</td>

      {/* ✅ 金額も余裕を持たせる */}
      <td className="min-w-[100px] whitespace-nowrap">
        {transaction.amount.toLocaleString()}円
      </td>

      {/* ✅ メモは一番広く！ */}
      <td className="min-w-[200px]">{transaction.memo}</td>
    </tr>
  );
}