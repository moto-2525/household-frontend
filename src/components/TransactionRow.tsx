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
      router.push(`/transactions/${transaction.id}`); // ✅ Next.js の遷移
    }
  };

  return (
    <tr 
      onClick={handleClick} 
      className="cursor-pointer hover:bg-gray-100 transition"
      >
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.type}</td>
      <td>{transaction.amount.toLocaleString()}円</td>
      <td>{transaction.memo}</td>
    </tr>
  );
}