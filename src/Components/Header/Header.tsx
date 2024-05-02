import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Cart from "../../assets/cart.svg";
import Carrinho from "../../Page/Carrinho/Carrinho";
import { useResults } from "../Context/GlobalContext";

const Header: React.FC = () => {
  const { carrinho } = useResults();
  const [showModal, setShowModal] = useState(false);

  const mostrarModal = () => {
    setShowModal(true);
  };

  const ocultarModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ContainerHeader>
        <ConteudoHeader>
          <h3>MKS</h3>
          <p>Sistemas</p>
        </ConteudoHeader>

        <Button onClick={mostrarModal}>
          <img src={Cart} alt="Cart" />
          <p>{carrinho.length}</p>
        </Button>
        <AnimatePresence>
          {showModal && (
            <ModalContainer
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <Carrinho ocultar={ocultarModal} />
            </ModalContainer>
          )}
        </AnimatePresence>
      </ContainerHeader>
    </>
  );
};
export default Header;

const ContainerHeader = styled.div`
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  display: flex;
  background-color: #0f52ba;
  justify-content: space-around;
  align-items: center;
`;
const ConteudoHeader = styled.div`
  width: 80%;
  display: flex;
  align-items: center;

  h3 {
    font-size: 44px;
    color: #fff;
  }
  p {
    color: #fff;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 300;
    margin-top: 30px;
  }
`;
const Button = styled.button`
  width: 60px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: #fff;
  border: none;
  cursor: pointer;

  img {
    width: 15px;
  }
  p {
    margin: 0;
    padding: 0;
    font-weight: bold;
  }
`;

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 28%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 999;

  @media (max-width: 800px) {
    width: 80%;
  }
`;
