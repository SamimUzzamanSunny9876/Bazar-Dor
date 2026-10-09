import Link from "next/link";

interface MarketI {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetailsI {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: MarketI[];
}

const engToBngNumber = (num: string | number) => {
  if (num === undefined || num === null) return "০";
  const bngNumbers: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
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

const EachProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
  );
  const data: ProductDetailsI = await res.json();

  if (!data)
    return (
      <div className="text-center py-20 text-gray-500">তথ্য পাওয়া যায়নি।</div>
    );

  const unitBn = translateUnit(data.unit);
  const todayBn = engToBngNumber(data.today);
  const pctBn = engToBngNumber(data.change?.pct || 0);

  const diff = Math.abs(data.today - data.yesterday);
  const diffBn = engToBngNumber(diff);
  const isUp = data.change?.dir === "up";
  const isDown = data.change?.dir === "down";
  const trendText = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত আছে";
  const trendSymbol = isUp ? "▲" : isDown ? "▼" : "—";
  const trendColorClass = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-600";

  const globalMin = Math.min(...data.markets.map((m) => m.min));
  const globalMax = Math.max(...data.markets.map((m) => m.max));

  return (
    <div className="w-full bg-[#f4f6f4] min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-green-700 transition-colors">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/?category=${data.category}`}
            className="hover:text-green-700 transition-colors"
          >
            {data.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{data.nameBn}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-8 mb-10 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-inner border border-gray-100 shrink-0">
              {data.categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {data.nameBn}
              </h1>
              <p className="text-sm text-gray-500 font-medium mb-2">
                প্রতি {unitBn} · {data.categoryNameBn}
              </p>
              <p className="text-sm font-medium text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold">{trendText}</span> · {diffBn} টাকা
              </p>
            </div>
          </div>

          <div className="bg-[#f8f9f8] rounded-xl p-5 border border-gray-100 flex flex-col items-center justify-center min-w-[160px]">
            <span className="text-xs text-gray-500 font-medium mb-1">
              আজকের দাম
            </span>
            <div className="text-gray-900 font-bold text-4xl mb-1">
              {todayBn}
            </div>
            <span className="text-xs text-gray-500 mb-2">টাকা / {unitBn}</span>
            <div
              className={`${trendColorClass} text-sm font-bold flex items-center gap-1`}
            >
              <span className="text-xs">{trendSymbol}</span>
              <span>{pctBn}%</span>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">
                সর্বনিম্ন দাম
              </p>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {engToBngNumber(globalMin)}{" "}
                <span className="text-base text-gray-900 font-medium">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">
                সর্বাধিক দাম
              </p>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {engToBngNumber(globalMax)}{" "}
                <span className="text-base text-gray-900 font-medium">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">গড় দাম</p>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {todayBn}{" "}
                <span className="text-base text-gray-900 font-medium">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">প্রতি {unitBn}-এর হিসাবে</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-1/4">
                      বাজার
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-1/4">
                      বিভাগ
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-1/6">
                      সর্বনিম্ন
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-1/6">
                      সর্বাধিক
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-1/6 text-right">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.markets.map((market, index) => {
                    const avg = (market.min + market.max) / 2;

                    const formattedAvg = avg % 1 !== 0 ? avg.toFixed(2) : avg;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                          {market.market}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {market.division}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-800">
                          {engToBngNumber(market.min)} টাকা
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-800">
                          {engToBngNumber(market.max)} টাকা
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-bold text-right">
                          {engToBngNumber(formattedAvg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProduct;
