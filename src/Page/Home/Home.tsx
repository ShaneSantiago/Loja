import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useResults } from "../../Components/Context/GlobalContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductSkeleton from "./Components/Skeleton";
import Footer from "../../Components/Footer/Footer";

interface Product {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: string;
  brand: string;
}

interface CartItem extends Product {
  amount: number;
}

const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { carrinho, setCarrinho } = useResults();

  const adicionarItemNoCarrinho = (novoItem: Product) => {
    const itemExistente = carrinho.find(
      (item: CartItem) => item.id === novoItem.id
    );
    if (itemExistente) {
      const novoCarrinho = carrinho.map((item: CartItem) =>
        item.id === novoItem.id ? { ...item, amount: item.amount + 1 } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      const novoCarrinho = [...carrinho, { ...novoItem, amount: 1 }];
      setCarrinho(novoCarrinho);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products/?page=1&rows=20&sortBy=id&orderBy=ASC"
      )
      .then((res) => {
        setProdutos(res.data.products);
        setLoading(false);
      })
      .catch((erro) => {
        console.log("Erro", erro);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Produtos>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Card key={index}>
                  <ContainerCard>
                    <ProductSkeleton />
                  </ContainerCard>
                  <ContainerBotao>
                    <Skeleton width="100%" height={20} />
                  </ContainerBotao>
                </Card>
              ))
            : produtos?.map((produto) => (
                <Card key={produto.id}>
                  <ContainerCard>
                    <img src={produto.photo} alt={produto.name} />
                    <Box>
                      <h3>
                        {produto.brand} {produto.name}
                      </h3>
                      <Preco>
                        R${parseInt(parseFloat(produto.price).toFixed(0))}
                      </Preco>
                    </Box>
                    <Descricao>{produto.description}</Descricao>
                  </ContainerCard>

                  <ContainerBotao>
                    <Button onClick={(e) => adicionarItemNoCarrinho(produto)}>
                      COMPRAR
                    </Button>
                  </ContainerBotao>
                </Card>
              ))}
        </Produtos>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Produtos = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const ContainerCard = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const Card = styled.div`
  width: 218px;
  height: 295px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 138px;
    height: 138px;
    border-radius: 5px;
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: flex-start;

  h3 {
    font-size: 16px;
    margin: 0;
    padding: 0;
    font-weight: 400;
  }
`;

const Preco = styled.p`
  font-size: 16px;
  font-weight: 400;
  padding: 5px;
  background-color: #373737;
  border-radius: 5px;
  font-weight: 700;
  color: #fff;
  margin-top: 0;
`;
const Descricao = styled.p`
  font-size: 10px;
  color: #2c2c2c;
  font-weight: 300;
  margin: 0;
  padding: 0;
`;
const ContainerBotao = styled.div`
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  background-color: #0f52ba;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 0px 0px 8px 8px;
  padding: 5px;
  border: none;
  cursor: pointer;
`;
