import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

ReactModal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false);

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionModalOpen(true);
  }
  
  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <div className="App">
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <ReactModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}>

        </ReactModal>
      <GlobalStyle />
    </div>
  );
}
