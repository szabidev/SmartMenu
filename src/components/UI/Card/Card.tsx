import { FC } from "react";

import "./Card.css";

interface CardProps {
  children?: JSX.Element | JSX.Element[] | string;
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
