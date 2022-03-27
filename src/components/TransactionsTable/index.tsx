import { useTransactions } from "../../hooks/useTransactions";
import { parseCurrency, parseDate } from "../../utils/utils";
import { Container } from "./styles";

export const TransactionsTable = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === "withdraw" && "-"}{" "}
                {parseCurrency(transaction.value)}
              </td>
              <td>{transaction.category}</td>
              <td>{parseDate(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
