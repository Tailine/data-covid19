import styled from "styled-components";
import { Paragraph, breakpoints } from "../../styles/shared";

// background - #1c1e32
// color - #b4b4b9
// green - #00f69b
// blue - #2159f2
//#27304d
// #292b4d
// #f2f1ef
// #22272c
//#c91866

export const H1 = styled.h1`
  text-align: center;
`;

export const Main = styled.main`
  background: #0d1219;
  color: #f2f1ef;
  min-height: 100vh;
  height: 100%;

  @media ${breakpoints.laptopL} {
    display: flex;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  padding: 2em;

  @media ${breakpoints.laptopL} {
    width: 75%;
  }

  @media ${breakpoints.desktop} {
    width: 40%;
  }
`;

export const CardContainer = styled.div`
  @media ${breakpoints.tablet} {
    display: flex;
    justify-content: space-between;
  }
`;

export const Select = styled.select`
  border-radius: 8px;
  font-size: 1.2em;
  padding: 0.3em 0;
  width: 100%;
  margin: 1em 0;

  &:focus {
    overflow: hidden;
  }

  @media ${breakpoints.tablet} {
    width: auto;
  }
`;

export const Option = styled.option`
  width: 100%;
  overflow: hidden;
`;

export const ErrorMessage = styled(Paragraph)`
  text-align: center;
  margin: 1em 0;
`;
