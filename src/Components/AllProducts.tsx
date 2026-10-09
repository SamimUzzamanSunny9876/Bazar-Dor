import React from "react";

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

// Helper function to convert English numbers to Bengali numbers
const engToBngNumber = (num: string | number) => {
  if (num === undefined || num === null) return "০";
  const bngNumbers: { [key: string]: string } = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    ".": ".",
  };
  return String(num).replace(/[0-9]/g, (match) => bngNumbers[match] || match);
};

// Helper function to translate units to Bengali for "প্রতি ..."
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

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: ProductI[] = await res.json();

  // Dynamically calculate the total number of products and convert to Bengali
  const totalProductsBn = engToBngNumber(data.length);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          সব পণ্য
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium">
          মোট {totalProductsBn}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((fitem, index: number) => {
          const todayBn = engToBngNumber(fitem.today);
          const pctBn = engToBngNumber(fitem.change?.pct || 0);
          const unitBn = translateUnit(fitem.unit);

          // Conditionals for trend design
          const isUp = fitem.change?.dir === "up";
          const isDown = fitem.change?.dir === "down";

          // Default state (flat/no change)
          let trendColor = "text-gray-600";
          let trendBg = "bg-gray-50";
          let trendIcon = "—";

          if (isUp) {
            trendColor = "text-red-600";
            trendBg = "bg-red-50";
            trendIcon = "▲";
          } else if (isDown) {
            trendColor = "text-green-600";
            trendBg = "bg-green-50";
            trendIcon = "▼";
          }

          return (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Top part: Icon, Name, and Unit */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-gray-50">
                  {fitem.categoryIcon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {fitem.nameBn}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    প্রতি {unitBn}
                  </p>
                </div>
              </div>

              {/* Bottom part: Price and Percentage */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium mb-1">
                    আজকের দাম
                  </span>
                  <div className="text-gray-900 font-bold flex items-baseline gap-1.5">
                    <span className="text-2xl md:text-3xl">{todayBn}</span>
                    <span className="text-sm md:text-base font-semibold">
                      টাকা
                    </span>
                  </div>
                </div>

                {/* Dynamic Trend Indicator */}
                <div
                  className={`${trendColor} ${trendBg} text-sm font-bold flex items-center gap-1 px-2 py-1 rounded-md`}
                >
                  <span className="text-xs">{trendIcon}</span>
                  <span>{pctBn}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;