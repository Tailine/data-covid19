import styled, { createGlobalStyle, css } from "styled-components";

export const H2 = styled.h2`
  margin: 1em 0;

  &:after {
    content: "";
    display: block;
    width: 2em;
    height: 2px;
    background: #00f69b;
  }
`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Titillium Web', sans-serif;
  }
`;

export const tablet = css`
  @media (min-width: 758px) and (max-width: 1024px);
`;

export const Paragraph = styled.p`
  font-size: 1.2em;
`;

export const LoadingContainer = styled.div`
  background: #0d1219;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 1.5em;
`;

export const Loading = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 0.3rem solid #2e425b;
  border-top-color: #00f69b;
  animation: spin 1s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
