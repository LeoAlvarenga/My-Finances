import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import CloseImage from "../../assets/close.svg";
import IncomeImage from "../../assets/income.svg";
import OutcomeImage from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState<"deposit" | "withdraw">("deposit");
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    await createTransaction(data);

    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={CloseImage} alt="Close modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register Transaction</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={IncomeImage} alt="Income" />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={OutcomeImage} alt="Outcome" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Register</button>
      </Container>
    </ReactModal>
  );
};
