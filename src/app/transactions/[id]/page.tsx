import type { Transaction } from "@/types/Transaction";

// ✅ params を async/await で受け取る
export default async function TransactionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ← ここ重要！

  // ✅ fetch は no-store でキャッシュ無効化
  const data: Transaction = await fetch(
    `http://localhost:3001/transactions/${id}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div>
      <h1>詳細ページ</h1>
      <p>ID: {data.id}</p>
      <p>日付: {data.date}</p>
      <p>種別: {data.type}</p>
      <p>金額: {data.amount}</p>
      <p>メモ: {data.memo}</p>
    </div>
  );
}