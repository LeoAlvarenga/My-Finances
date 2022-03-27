import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  
  return (
    <Container>
      <Content>
        <div className="logo">
          <img src={logoImg} alt="My Finances" />
          <h2>My Finances</h2>
        </div>
        <button onClick={onOpenNewTransactionModal}>New Transaction</button>
      </Content>
    </Container>
  );
};
