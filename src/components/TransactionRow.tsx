import Link from 'next/link';
import type { Transaction } from '@/types/Transaction';

type Props = {
  transaction: Transaction;
  onDelete: (id: number) => void;
};

export default function TransactionRow({ transaction, onDelete }: Props) {
  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      {/* ID */}
      <td>
        <Link href={`/transactions/${transaction.id}`}>
          {' '}
          {/*コンポーネントの中で Link を使って “動的ルートに遷移させている”*/}
          {transaction.id}
        </Link>
      </td>

      {/* 日付 */}
      <td>
        <Link href={`/transactions/${transaction.id}`}>{transaction.date.split('T')[0]}</Link>
      </td>

      {/* 種別 */}
      <td>
        <Link href={`/transactions/${transaction.id}`}>{transaction.type}</Link>
      </td>

      {/* 金額 */}
      <td>
        <Link href={`/transactions/${transaction.id}`}>
          {transaction.amount.toLocaleString()}円
        </Link>
      </td>

      {/* メモ */}
      <td>
        <Link href={`/transactions/${transaction.id}`}>{transaction.memo}</Link>
      </td>

      {/* 削除ボタン */}
      <td>
        <button onClick={() => onDelete(transaction.id)}>削除</button>
      </td>
    </tr>
  );
}
