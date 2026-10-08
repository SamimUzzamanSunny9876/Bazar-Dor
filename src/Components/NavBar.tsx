import Image from "next/image";

const NavBar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <nav className="w-full bg-gray-50/50 py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
       
        <div className="flex justify-between items-center w-full">
          
      
          <div className="flex items-center gap-4">
     
            <div className="bg-green-700 rounded-xl p-2.5 flex items-center justify-center shadow-sm">
              <Image
                width={32}
                height={32}
                alt="logo"
                src={"/logo-icon.png"}
                className="object-contain"
              />
            </div>


            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {date}
              </p>
            </div>
          </div>

       
          <div className="flex items-center gap-6">
            <button className="text-gray-800 font-bold hover:text-green-700 transition-colors">
              সাইন ইন
            </button>
            <button className="bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg shadow hover:bg-green-800 transition-colors">
              সাইন আপ
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;