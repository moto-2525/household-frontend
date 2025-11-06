// src/types/Transaction.ts
export type Transaction = {
    id: number;
    date: string;
    type: "収入" | "支出";
    amount: number;
    memo: string;
  };