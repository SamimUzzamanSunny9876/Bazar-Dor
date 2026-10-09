import Image from 'next/image';
import CurrentDate from './CurrentDate';

const Banner = () => {
    return (
        <div className="w-full bg-[#f4f6f4] py-4 md:py-6">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm">
                    
                    <div className="flex-1 space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                        
                     
                        <CurrentDate className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit min-h-[28px]" />

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            আজকের বাজারের দাম এক নজরে
                        </h2>

                        <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <button className="bg-[#008f5d] hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors w-fit shadow-md text-sm md:text-base">
                            সব পণ্য দেখুন
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end w-full max-w-[200px] md:max-w-[300px] lg:max-w-[350px]">
                        <Image 
                            width={350} 
                            height={350} 
                            src={'/bazar-hero.png'} 
                            alt="Bazar Hero" 
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;