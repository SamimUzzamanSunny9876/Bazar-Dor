import SortDropdown from "@/Components/SortDropdown";

interface ProductI {
  categoryIcon: string;
  nameBn: string;
  categoryNameBn: string;
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

const CategoriesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }> | { id: string };
  searchParams?: Promise<{ sort?: string }> | { sort?: string };
}) => {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const sort = resolvedSearchParams?.sort || "default";

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${id}`,
  );
  const rawData: ProductI[] = await res.json();

  if (!rawData || rawData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500 font-medium">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  const sortedData = [...rawData];

  if (sort === "low-to-high") {
    sortedData.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sort === "high-to-low") {
    sortedData.sort((a, b) => Number(b.today) - Number(a.today));
  }

  const categoryIcon = sortedData[0].categoryIcon;
  const categoryNameBn = sortedData[0].categoryNameBn;
  const totalProductsBn = engToBngNumber(sortedData.length);

  return (
    <div className="w-full bg-[#f4f6f4] min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-inner border border-gray-100">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {categoryNameBn}
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              {totalProductsBn}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">সাজান</span>
              <SortDropdown />
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-500 font-medium">
            মোট {totalProductsBn}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedData.map((fitem, index: number) => {
            const todayBn = engToBngNumber(fitem.today);
            const pctBn = engToBngNumber(fitem.change?.pct || 0);
            const unitBn = translateUnit(fitem.unit);

            const isUp = fitem.change?.dir === "up";
            const isDown = fitem.change?.dir === "down";

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
                key={fitem.nameBn + index}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
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
    </div>
  );
};

export default CategoriesPage;
