"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get the current sort value from the URL, defaulting to 'default'
  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "default") {
      params.delete("sort"); // Remove the parameter to return to default
    } else {
      params.set("sort", value);
    }
    
    // Update the URL (e.g., ?sort=high-to-low)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 outline-none cursor-pointer shadow-sm min-w-[130px]"
    >
      <option value="default">ডিফল্ট</option>
      <option value="high-to-low">বেশি থেকে কম</option>
      <option value="low-to-high">কম থেকে বেশি</option>
    </select>
  );
}