import AllProducts from "@/Components/AllProducts";
import Banner from "@/Components/Banner";
import PriceDecrease from "@/Components/PriceDecrease";
import PriceIncrease from "@/Components/PriceIncrease";


export default function Home() {
  return (
  <div>
    
     <Banner/>
     <PriceIncrease/>
     <PriceDecrease/>
     <AllProducts/>
     </div>
  );
}
