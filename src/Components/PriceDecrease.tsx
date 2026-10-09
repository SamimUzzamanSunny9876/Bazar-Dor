import React from "react";
import PriceDecreaseClient from "./PriceDecreaseClient"; 

interface ProductI {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const PriceDecrease = async () => {
 
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: ProductI[] = await res.json();


  const decreasedPriceProducts = data.filter(
    (item) => item.change.dir === "down"
  );


  return <PriceDecreaseClient products={decreasedPriceProducts} />;
};

export default PriceDecrease;