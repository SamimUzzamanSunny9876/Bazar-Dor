"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

// 1. Add { className }: { className?: string } here
const CurrentDate = ({ className }: { className?: string }) => {
  const date = useSyncExternalStore(subscribe, getDate, () => "");

  // 2. Make sure you are using the className prop here
  return (
    <div className={className || "text-[11px] md:text-sm text-gray-600 font-medium tracking-tight md:tracking-normal min-h-[20px]"}>
      {date}
    </div>
  );
};

export default CurrentDate;