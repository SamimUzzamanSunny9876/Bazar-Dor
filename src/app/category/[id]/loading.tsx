import React from 'react';

const loading = () => {
    return (
         <div className="min-h-screen bg-[#f4f6f4] flex flex-col items-center justify-center p-4 font-sans">
            
         
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
             
                <div className="absolute inset-0 rounded-full border-4 border-[#008f5d] border-t-transparent animate-spin"></div>
            </div>
            
      
            <h2 className="mt-6 text-lg md:text-xl font-bold text-gray-800 animate-pulse">
                লোড হচ্ছে...
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 text-center max-w-xs">
                অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন, আমরা তথ্য প্রস্তুত করছি।
            </p>
            
        </div>
    );
};

export default loading;