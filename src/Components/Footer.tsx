import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full">
           
            <div className="bg-white border-t border-b border-gray-200 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-800 font-medium">
                    <p>
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                    <p className="text-center md:text-right">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
            
         
            <div className="bg-[#1e1e1e] h-16 w-full"></div>
        </footer>
    );
};

export default Footer;