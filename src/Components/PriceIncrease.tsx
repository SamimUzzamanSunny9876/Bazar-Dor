
import PriceIncreaseClient from "./PriceIncreaseClient";


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

const PriceIncrease = async () => {

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: ProductI[] = await res.json();

  const increasedPriceProducts = data.filter(
    (item) => item.change.dir === "up"
  );

  
  return <PriceIncreaseClient products={increasedPriceProducts} />;
};

export default PriceIncrease;