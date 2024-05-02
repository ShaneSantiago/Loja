import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useResults } from "../../Components/Context/GlobalContext";

interface CarrinhoProps {
  ocultar: () => void;
}

interface Product {
  amount: number;
  id: number;
  name: string;
  description: string;
  photo: string;
  price: string;
  brand: string;
}

const Carrinho: React.FC<CarrinhoProps> = ({ ocultar }) => {
  const { carrinho, setCarrinho } = useResults();
  const [total, setTotal] = useState<number>(0);

  // Atualiza o valor total sempre que o carrinho mudar
  useEffect(() => {
    const novoTotal = carrinho.reduce((acc: any, item: any) => {
      return acc + parseFloat(item.price) * item.amount;
    }, 0);
    setTotal(novoTotal);
  }, [carrinho]);

  const adicionarProduto = (novoItem: Product) => {
    const itemExistente = carrinho.find(
      (item: Product) => item.id === novoItem.id
    );
    if (itemExistente) {
      const novoCarrinho = carrinho.map((item: Product) =>
        item.id === novoItem.id ? { ...item, amount: item.amount + 1 } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      const novoCarrinho = [...carrinho, { ...novoItem, amount: 1 }];
      setCarrinho(novoCarrinho);
    }
  };

  const removerProduto = (index: number) => {
    const novoCarrinho = [...carrinho];
    if (index !== -1) {
      if (novoCarrinho[index].amount > 1) {
        novoCarrinho[index].amount--;
      } else {
        novoCarrinho.splice(index, 1);
      }
      setCarrinho(novoCarrinho);
    }
  };

  return (
    <>
      <ContainerCarrinho>
        <Container>
          <Box>
            <Titulo>Carrinho de compras</Titulo>
          </Box>
          <ButtonFechar onClick={ocultar}>X</ButtonFechar>
        </Container>

        {carrinho.map((item: Product, index: number) => (
          <ContainerCard key={index}>
            <Card>
              <Img src={item.photo} />
              <Nome>{item.name}</Nome>
              <Info>
                <Qtd>Qtd</Qtd>
                <QuantidadeContainer>
                  <Button onClick={() => removerProduto(index)}>-</Button>
                  <Quantidade>{item.amount}</Quantidade>
                  <Button onClick={() => adicionarProduto(item)}>+</Button>
                </QuantidadeContainer>
              </Info>
              <Preco>
                R${(parseFloat(item.price) * item.amount).toFixed(0)}
              </Preco>
            </Card>
          </ContainerCard>
        ))}
      </ContainerCarrinho>

      <ContainerTotal>
        <BoxTotal>
          <p>Total:</p>
          <p>R${total.toFixed(0)}</p>
        </BoxTotal>
        <ButtonFinalizar>Finalizar compra</ButtonFinalizar>
      </ContainerTotal>
    </>
  );
};
export default Carrinho;

const ContainerCarrinho = styled.div`
  width: 100%;
  background-color: #0f52ba;
  height: 580px;
  overflow-y: auto;
`;
const Container = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Box = styled.div``;

const Titulo = styled.div`
  width: 56%;
  color: #fff;
  font-weight: 700;
  font-size: 27px;
`;

const ButtonFechar = styled.button`
  width: 38px;
  height: 38px;
  background-color: none;
  border-radius: 50%;
  background-color: #000000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

const ContainerCard = styled.div`
  width: 90%;
  padding: 0px 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 90%;
  background-color: #fff;
  height: 95px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
`;

const Img = styled.img`
  width: 46px;
  height: 46px;
`;

const Preco = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const Nome = styled.p`
  font-size: 14px;
  width: 30%;
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 8px;
  color: #555;
  margin: 0;
`;

const Quantidade = styled.span`
  font-size: 8px;
  font-weight: bold;
  margin: 5px;
  padding: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
`;

const QuantidadeContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  QuantidadeContainer::before {
    content: "|";
    color: #bfbfbf;
    margin: 0 5px;
  }
`;
const Qtd = styled.p`
  margin: 0;
  padding: 0;
  font-size: 8px;
  margin-bottom: 5px;
`;

const ContainerTotal = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f52ba;
  color: white;
  flex-direction: column;
  p {
    color: white;
  }
`;

const BoxTotal = styled.div`
  width: 80%;
  display: flex;
  height: 55px;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: 800px) {
    width: 80%;
    height: 40px;
  }
`;

const ButtonFinalizar = styled.button`
  width: 100%;
  height: 70px;
  background-color: #000000;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
`;
