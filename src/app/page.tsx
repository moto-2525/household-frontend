"use client";

import useSWR from "swr";
import { useState } from "react";

import SummaryTable from "@/components/SummaryTable";
import TransactionRow from "@/components/TransactionRow";
import type { Transaction } from "@/types/Transaction";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // ✅ 一覧取得（SWR）
  const { data: transactions, mutate } = useSWR<Transaction[]>(
    "http://localhost:3001/transactions",
    fetcher
  );

  // ✅ 新規登録フォーム
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    type: "",
    amount: "",
    memo: "",
  });

  // ✅ 登録処理
  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTransaction,
          amount: Number(newTransaction.amount),
        }),
      });

      // フォーム初期化
      setNewTransaction({ date: "", type: "", amount: "", memo: "" });

      // ✅ mutate() で一覧を再取得（SWRの更新）
      mutate();
    } catch (error) {
      console.error("登録エラー:", error);
    }
  };

  if (!transactions) return <p>読み込み中...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1>🐣家計簿アプリ🐣</h1>

        {/* ✅ 一覧テーブル */}
        <h2>📄 入出金履歴</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>日付</th>
            <th>種別</th>
            <th>金額</th>
            <th>メモ</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>

      {/* ✅ 集計表 */}
      <SummaryTable transactions={transactions} />



      {/* ✅ 新規登録フォーム */}
      <h2 style={{ marginTop: "30px" }}>✏️ 新しい入出金を登録</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-6 ml-8"
      >
        {/* 日付 */}
        <div className="mb-4">
          <label className="font-medium cursor-pointer">日付：</label>
          <input
            type="date"
            className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-100 transition"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
            required
          />
        </div>
        
        {/* 種別 */}
        <div className="mb-4">
        <label className="font-medium cursor-pointer">種別：</label>
          <select
            className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-100 transition"
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, type: e.target.value })
            }
            required
          >
            <option value="">選択してください</option>
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </div>

        {/* 金額 */}
        <div className="mb-4">
          <label className="font-medium cursor-pointer">金額：</label>
          <input
            type="number"
            className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-100 transition"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
            required
          />
        </div>

        {/* メモ */}
        <div className="mb-4">
          <label className="font-medium cursor-pointer">メモ：</label>
          <input
            type="text"
            className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-100 transition"
            value={newTransaction.memo}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, memo: e.target.value })
            }
          />
        </div>

        <div className="pl-12 mt-4">
        <button
          type="submit"
          className="
               cursor-pointer
               relative z-0 h-12 rounded-full 
               bg-blue-500 hover:bg-blue-600 
               px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full 
               active:scale-95 active:transition active:after:scale-x-125 active:after:scale-y-150 active:after:opacity-0 active:after:transition active:after:duration-500">
            登録
        </button>
        </div>
      </form>
    </div>
  );
}

