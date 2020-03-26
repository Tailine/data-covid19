import styled, { createGlobalStyle } from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`
};

export const colors = {
  green: "#00f69b",
  black: "#0d1219",
  almostWhite: "#f2f1ef",
  blue: "#2e425b"
};

export const H2 = styled.h2`
  margin: 1em 0;

  &:after {
    content: "";
    display: block;
    width: 2em;
    height: 2px;
    background: ${colors.green};
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

export const Paragraph = styled.p`
  font-size: 1.2em;
`;

export const LoadingContainer = styled.div`
  background: #0d1219;
  height: ${props => (props.addHeight ? "100vh" : "auto")};
  width: ${props => (props.addWidth ? "100vw" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 0.3rem solid ${colors.blue};
  border-top-color: ${colors.green};
  animation: spin 1s infinite linear;
  margin-top: 1em;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
