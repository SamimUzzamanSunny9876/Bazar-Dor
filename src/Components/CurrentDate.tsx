"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

const CurrentDate = ({ className }: { className?: string }) => {
  const date = useSyncExternalStore(subscribe, getDate, () => "");


  return (
    <div className={className || "text-[11px] md:text-sm text-gray-600 font-medium tracking-tight md:tracking-normal min-h-[20px]"}>
      {date}
    </div>
  );
};

export default CurrentDate;