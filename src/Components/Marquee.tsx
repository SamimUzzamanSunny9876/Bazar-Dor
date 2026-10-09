import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface ProductI {
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string; 
    pct: number;
  };
}


const engToBngNumber = (num: string | number) => {
  if (num === undefined || num === null) return "০";
  const bngNumbers: { [key: string]: string } = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    ".": ".",
  };
  return String(num).replace(/[0-9]/g, (match) => bngNumbers[match] || match);
};


const translateUnit = (unit: string) => {
  if (!unit) return "";
  const unitMap: { [key: string]: string } = {
    kg: "কেজি",
    gm: "গ্রাম",
    ltr: "লিটার",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    pcs: "পিস",
    piece: "পিস",
    dozen: "ডজন",
    hali: "হালি",
  };
  const normalizedUnit = unit.toLowerCase().trim();
  return unitMap[normalizedUnit] || unit;
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: ProductI[] = await res.json();

  return (
    <div className="w-full bg-gray-50/30 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center py-2.5 md:py-3 overflow-x-auto whitespace-nowrap no-scrollbar">
            <MarqueeText direction="right" duration={12}>

          {data.map((item, index: number) => {
            const priceBn = engToBngNumber(item.today);
            const unitBn = translateUnit(item.unit);
            
          
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";
            const trendPctBn = engToBngNumber(item.change?.pct);

       
            const trendColor = isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500";
            const trendIcon = isUp ? "▲" : isDown ? "▼" : "-";

            return (
              <div 
                key={item.nameBn + index} 
                className="flex items-center gap-2 md:gap-2.5 px-4 md:px-6 border-r border-gray-300 last:border-r-0 shrink-0"
              >
                <span className="text-lg md:text-xl drop-shadow-sm">
                  {item.categoryIcon}
                </span>
                
                <span className="text-sm md:text-base font-medium text-gray-900">
                  {item.nameBn}
                </span>
                
                <span className="text-sm md:text-base text-gray-700 ml-1">
                  {priceBn} টাকা/{unitBn}
                </span>

                {item.change && (
                  <div className={`flex items-center gap-1 text-xs md:text-sm font-bold ml-1 ${trendColor}`}>
                    <span>{trendIcon}</span>
                    <span>{trendPctBn}%</span>
                  </div>
                )}
              </div>
            );
          })}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;