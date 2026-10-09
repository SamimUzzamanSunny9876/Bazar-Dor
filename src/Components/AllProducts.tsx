import React from "react";
import AllProductsClient from "./AllProductsClient"; // Import the client component

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

const AllProducts = async () => {

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: ProductI[] = await res.json();

  return <AllProductsClient products={data} />;
};

export default AllProducts;