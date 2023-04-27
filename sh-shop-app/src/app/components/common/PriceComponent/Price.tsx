import React from "react";

interface PriceProps {
  price: string;
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return <span>&pound;{price}</span>;
};

export default Price;
