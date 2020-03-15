import React from "react";
import { CardComponent, Title, Subtitle } from "./styled";

export function Card({ title, value }) {
  return (
    <CardComponent>
      <Title>{title}</Title>
      <Subtitle>{value}</Subtitle>
    </CardComponent>
  );
}
