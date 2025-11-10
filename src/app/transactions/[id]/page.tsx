import Link from "next/link";
import type { Transaction } from "@/types/Transaction";

export default async function TransactionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);

  const data: Transaction = await fetch(
    `http://localhost:3001/transactions/${id}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  console.log(data);

  return (
    <div className="max-w-md mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">📄 詳細ページ</h1>

      <div className="space-y-4">
        {/* 日付 */}
        <div className="mb-4">
          <label className="font-medium">日付：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.date}</p>
        </div>

        {/* 種別 */}
        <div className="mb-4">
          <label className="font-medium">種別：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.type}</p>
        </div>

        {/* 金額 */}
        <div className="mb-4">
          <label className="font-medium">金額：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.amount}円</p>
        </div>

        {/* メモ */}
        <div className="mb-4">
          <label className="font-medium">メモ：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.memo}</p>
        </div>
        {/* ✅ 戻るボタン */}
        <div className="mt-6">
      <Link href="/">
        <button
          className="
            cursor-pointer
            h-12 px-6 rounded-full
            bg-blue-500 hover:bg-blue-600 
            text-neutral-50 
            flex items-center justify-center
            active:scale-95 active:transition
          "
        >
          戻る
        </button>
      </Link>
    </div>
      </div>
    </div>
  );
}

