import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Container>
        <p>MKS sistemas © Todos os direitos reservados</p>
      </Container>
    </>
  );
};
export default Footer;

const Container = styled.div`
  width: 100%;
  background-color: #ccc;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 400;
    color: #000000;
  }
`;
