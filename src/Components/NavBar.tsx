import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";

const NavBar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <nav className="w-full bg-gray-50/50 py-3 md:py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full">
          <Link href={"/"}>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-green-700 rounded-lg md:rounded-xl p-2 md:p-2.5 flex items-center justify-center shadow-sm">
                <Image
                  width={32}
                  height={32}
                  alt="logo"
                  src={"/logo-icon.png"}
                  className="object-contain w-6 h-6 md:w-8 md:h-8"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
                  বাজার দর
                </h1>
                <p className="text-[11px] md:text-sm text-gray-600 font-medium tracking-tight md:tracking-normal">
                  {date}
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-sm md:text-base text-gray-800 font-bold hover:text-green-700 transition-colors">
              সাইন ইন
            </button>
            <button className="bg-green-700 text-white text-sm md:text-base font-bold py-1.5 px-4 md:py-2.5 md:px-6 rounded-md md:rounded-lg shadow hover:bg-green-800 transition-colors">
              সাইন আপ
            </button>
          </div>
        </div>
      </div>
      <NavLink />
    </nav>
  );
};

export default NavBar;
