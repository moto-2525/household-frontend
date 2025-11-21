import Link from 'next/link';
import type { Transaction } from '@/types/Transaction';

export default async function TransactionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data: Transaction = await fetch(`http://localhost:4000/transactions/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <div className="max-w-md mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">📄 詳細ページ</h1>

      <div className="space-y-4">
        <div className="mb-4">
          <label className="font-medium">日付：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.date.split('T')[0]}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">種別：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.type}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">金額：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.amount.toLocaleString()}円</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">メモ：</label>
          <p className="border rounded px-3 py-2 bg-gray-50">{data.memo}</p>
        </div>

        <div className="mt-6">
          <Link href="/">
            <button className="h-12 px-6 rounded-full bg-blue-500 text-white">戻る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
