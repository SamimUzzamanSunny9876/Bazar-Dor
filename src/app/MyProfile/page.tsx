"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; 

const MyProfile = () => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false); 
  
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  
    const formData = new FormData(e.currentTarget);
    const updatedName = formData.get("name") as string;

    setIsUpdating(true); 

   
    const { data, error } = await authClient.updateUser({
      name: updatedName,
    });

    if (data) {
      toast.success("প্রোফাইল আপডেট সফল হয়েছে! (Profile Updated)");
      router.refresh();
    }

    if (error) {
      console.error("Update Error:", error);
      toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    }

    setIsUpdating(false); 
  };

  
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

 
  if (!session?.user) {
    router.push("/SignIn");
    return null;
  }


  const user = session.user;
  const avatarUrl =
    user.image ||
    `https://ui-avatars.com/api/?name=${user.name}&background=f4f6f4&color=008f5d`;

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex flex-col items-center py-10 md:py-16 px-4 font-sans">
      
      
      <div className="w-full max-w-2xl flex flex-col gap-6 md:gap-8">
        
       
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6 md:gap-0">
          
          <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl object-cover border border-gray-100 bg-gray-50 shadow-sm"
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1">
                {user.name}
              </h2>
              <p className="text-sm md:text-[15px] text-gray-500 font-medium">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-semibold transition-colors text-sm md:text-[15px] shadow-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            সাইন আউট
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
            তথ্য
          </h3>
          
          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-sm font-semibold text-gray-700">নাম</label>
              <input
                type="text"
                name="name" 
                defaultValue={user.name} 
                className="w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008f5d]/20 focus:border-[#008f5d] transition-all text-sm md:text-[15px] text-gray-900 font-medium"
                placeholder="আপনার নাম লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#008f5d] hover:bg-[#007a4f] disabled:bg-gray-400 text-white font-bold py-3.5 md:py-4 rounded-xl transition-colors mt-2 text-sm md:text-[15px] shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default MyProfile;