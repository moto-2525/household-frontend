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
    <div>
      <h1>💰 入出金履歴一覧（Next.js + SWR版）</h1>

      {/* ✅ 集計表 */}
      <SummaryTable transactions={transactions} />

      {/* ✅ 一覧テーブル */}
      <table border={1} cellPadding={8}>
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

      {/* ✅ 新規登録フォーム */}
      <h2 style={{ marginTop: "30px" }}>💡 新しい入出金を登録</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label>日付：</label>
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>種別：</label>
          <select
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

        <div>
          <label>金額：</label>
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>メモ：</label>
          <input
            type="text"
            value={newTransaction.memo}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, memo: e.target.value })
            }
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          追加
        </button>
      </form>
    </div>
  );
}

