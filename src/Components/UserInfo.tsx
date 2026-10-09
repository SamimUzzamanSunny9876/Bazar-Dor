"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  
  const firstName = user?.name?.split(" ")[0] || "User";


  const avatarUrl =
    user?.image ||
    `https://ui-avatars.com/api/?name=${user?.name}&background=f4f6f4&color=008f5d`;

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
        
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 md:gap-2.5 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-xl transition-colors outline-none"
          >
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-100 bg-white shadow-sm"
            />
            <span className="text-sm md:text-[17px] font-semibold text-gray-800">
              {firstName}
            </span>
           
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

     
          <div
            tabIndex={-1}
            className="dropdown-content bg-white rounded-2xl z-[1] w-64 md:w-72 p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 mt-2 flex flex-col"
          >
      
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-1">
                {user.name}
              </h3>
              <p className="text-sm md:text-[15px] text-gray-500">
                {user.email}
              </p>
            </div>

       
            <div className="flex flex-col gap-1 mt-2">
              <Link
                href="/MyProfile"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#f0f7f4] text-gray-800 hover:text-[#008f5d] font-medium transition-colors text-sm md:text-[15px]"
              >
                <span className="text-[#008f5d] text-lg">👤</span> আমার প্রোফাইল
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors text-left text-sm md:text-[15px] cursor-pointer"
              >
                <span className="text-red-500 text-lg">↩</span> সাইন আউট
              </button>
            </div>
          </div>
        </div>
      ) : (
    
        <div className="flex items-center gap-4 md:gap-5">
          <Link href={"/SignIn"}>
            <button className="text-sm md:text-base text-gray-800 font-bold hover:text-green-700 transition-colors">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/SignUp"}>
            <button className="bg-[#008f5d] text-white text-sm md:text-base font-bold py-2 px-5 md:py-2.5 md:px-6 rounded-xl shadow-sm hover:bg-[#007a4f] transition-colors">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;