import styled from "styled-components";
import { breakpoints } from "../../styles/shared";

export const CardComponent = styled.section`
  margin: 1em 0;
  border-radius: 8px;
  background: #2e425b;
  padding: 1em;
  text-align: center;

  @media ${breakpoints.tablet} {
    min-width: 13em;
  }

  @media ${breakpoints.laptop} {
    min-width: 17em;
  }
`;

export const Title = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 1.2em;
`;
