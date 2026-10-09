import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#f4f6f4] flex flex-col items-center justify-center py-12 px-4 font-sans text-center">
            
           
            <h1 className="text-7xl md:text-9xl font-extrabold text-[#008f5d] tracking-widest drop-shadow-sm">
                404
            </h1>
            
           
            <div className="mt-6 md:mt-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি!
                </h2>
                <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                    আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ আছে।
                </p>
            </div>

         
            <Link 
                href="/" 
                className="mt-8 bg-[#008f5d] hover:bg-[#007a4f] text-white font-semibold py-3 px-6 md:py-3.5 md:px-8 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm md:text-[15px] group"
            >
           
                <svg 
                    className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                হোম পেজে ফিরে যান
            </Link>
            
        </div>
    );
};

export default NotFound;