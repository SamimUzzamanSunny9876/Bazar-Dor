import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
import UserInfo from "./UserInfo";
import CurrentDate from "./CurrentDate"; 
import { Suspense } from "react";

const NavBar = () => {


  return (
    <nav className="w-full bg-gray-50/50 py-3 md:py-4 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md">
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
                
          
                <CurrentDate />
                
              </div>
            </div>
          </Link>

          <UserInfo />
        </div>
      </div>
      <Suspense fallback={<div>Loading products...</div>}>
         <NavLink />
      </Suspense>
    
    </nav>
  );
};

export default NavBar;