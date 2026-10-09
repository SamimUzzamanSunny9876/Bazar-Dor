import AllProducts from "@/Components/AllProducts";
import Banner from "@/Components/Banner";
import PriceDecrease from "@/Components/PriceDecrease";
import PriceIncrease from "@/Components/PriceIncrease";
import { Suspense } from "react";


export default function Home() {
  return (
  <div>
    <Suspense fallback={<div>Loading products...</div>}>
        
  
     <Banner/>
       
     <PriceIncrease/>
     <PriceDecrease/>
     <AllProducts/>
         </Suspense>
     </div>
  );
}
