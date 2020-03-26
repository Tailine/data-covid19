import styled from "styled-components";
import { Paragraph, breakpoints, colors } from "../../styles/shared";

export const H1 = styled.h1`
  text-align: center;
`;

export const Main = styled.main`
  background: ${colors.black};
  color: ${colors.almostWhite};
  min-height: 100vh;
  height: 100%;

  @media ${breakpoints.laptopL} {
    display: flex;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  padding: 2em;

  @media ${breakpoints.laptop} {
    padding: 2em 7em;
  }

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

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 33em;
  margin-top: 1em;
`;

export const TableRowData = styled(Paragraph)`
  font-weight: bold;
  border: 1px solid ${colors.blue};
  width: 100%;
  text-align: center;
`;
