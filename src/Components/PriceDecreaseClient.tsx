"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

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
    kg: "কেজি", gm: "গ্রাম", ltr: "লিটার", litre: "লিটার", liter: "লিটার",
    l: "লিটার", pcs: "পিস", piece: "পিস", dozen: "ডজন", hali: "হালি",
  };
  const normalizedUnit = unit.toLowerCase().trim();
  return unitMap[normalizedUnit] || unit;
};

export default function PriceDecreaseClient({ products }: { products: ProductI[] }) {

  const { data: session } = authClient.useSession();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
   
    if (!session?.user) {
      e.preventDefault(); 
      toast.warning("বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন।"); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-green-600 text-lg md:text-xl">▼</span> 
        আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((fitem, index: number) => {
          const todayBn = engToBngNumber(fitem.today);
          const pctBn = engToBngNumber(fitem.change.pct);
          const unitBn = translateUnit(fitem.unit);

          return (
            <Link
              key={fitem.id || index}
              href={`/eachProduct/${fitem.id}`}
              onClick={handleLinkClick} 
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer block"
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
                    <span className="text-sm md:text-base font-semibold">টাকা</span>
                  </div>
                </div>

                <div className="text-green-600 text-sm font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                  <span className="text-xs">▼</span>
                  <span>{pctBn}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}