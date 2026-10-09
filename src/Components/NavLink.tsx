import Link from "next/link";

interface NavLinkI {
  id: string;
  nameBn: string;
  icon: string;
  slug: string;
}
const NavLink = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data: NavLinkI[] = await res.json();

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-5 md:gap-8 py-2.5 md:py-3 overflow-x-auto no-scrollbar lg:justify-start">
          {data.map((item: NavLinkI) => {
            return (
              <Link
                href={`/category/${item.id}`}
                key={item.id}
                className="flex items-center gap-1.5 md:gap-2 text-gray-800 font-medium md:font-semibold text-xs md:text-sm cursor-pointer hover:text-green-700 transition-colors whitespace-nowrap shrink-0"
              >
                <span className="text-base md:text-lg">{item.icon}</span>
                <span>{item.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavLink;
