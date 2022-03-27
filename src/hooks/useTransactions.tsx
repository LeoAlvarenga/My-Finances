import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number;
  title: string;
  type: string;
  category: string;
  value: number;
  createdAt: Date;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transactionInput: TransactionInput) => Promise<void>;
  summary: { deposits: number; withdraws: number; total: number };
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.value;
        acc.total += transaction.value;
      } else {
        console.log({ transaction });
        acc.withdraws += transaction.value;
        acc.total -= transaction.value;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post("transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions((state) => [...state, transaction]);
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, summary }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
}
