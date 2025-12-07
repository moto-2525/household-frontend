'use client';

import useSWR, { mutate as globalMutate } from 'swr'; // ← ⭐ グローバル mutate を import
import { useState } from 'react';

import SummaryTable from '@/components/SummaryTable';
import TransactionRow from '@/components/TransactionRow';
import type { Transaction } from '@/types/Transaction';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // ------------------------------------
  // ⭐ newTransaction の useState が必要！
  // ------------------------------------
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: '',
    amount: '',
    memo: '',
  });

  // ------------------------------------
  // ⭐ 一覧取得
  // ------------------------------------
  const { data: transactions, mutate } = useSWR<Transaction[]>(
    'http://localhost:4000/transactions',
    fetcher,
  );

  // ------------------------------------
  // ⭐ 削除
  // ------------------------------------
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:4000/transactions/${id}`, {
      method: 'DELETE',
    });

    mutate(); // ローカルキャッシュを再読込
  };

  // ------------------------------------
  // ⭐ 登録処理
  // ------------------------------------
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTransaction,
          amount: Number(newTransaction.amount),
        }),
      });

      const created = await response.json();
      console.log('登録結果:', created);

      // フォーム初期化
      setNewTransaction({
        date: '',
        type: '',
        amount: '',
        memo: '',
      });

      // ⭐ SWR の一覧を確実に再取得（キー指定でグローバル mutate を使う）
      globalMutate('http://localhost:4000/transactions');
    } catch (error) {
      console.error('登録エラー:', error);
    }
  };

  if (!transactions) return <p>読み込み中...</p>;

  // ------------------------------------
  // JSX（省略なし）
  // ------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1>🐣家計簿アプリ🐣</h1>

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
            <TransactionRow key={t.id} transaction={t} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>

      <SummaryTable transactions={transactions} />

      <h2 style={{ marginTop: '30px' }}>✏️ 新しい入出金を登録</h2>

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
            className="border rounded px-2 py-1 cursor-pointer"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            required
          />
        </div>

        {/* 種別 */}
        <div className="mb-4">
          <label className="font-medium cursor-pointer">種別：</label>
          <select
            className="border rounded px-2 py-1 cursor-pointer"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
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
            type="text"
            className="border rounded px-2 py-1 cursor-pointer"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            required
          />
        </div>

        {/* メモ */}
        <div className="mb-4">
          <label className="font-medium cursor-pointer">メモ：</label>
          <input
            type="text"
            className="border rounded px-2 py-1 cursor-pointer"
            value={newTransaction.memo}
            onChange={(e) => setNewTransaction({ ...newTransaction, memo: e.target.value })}
          />
        </div>

        <div className="pl-12 mt-4">
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-white"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
