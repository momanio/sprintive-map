"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Map from "../public/LandingMap.svg?url";

export default function Home() {
  const [counter, setCounter] = useState<number>(499.005);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 0.001);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCounterClick = () => {
    router.push("/Hero");
  };

  return (
    <div className="absolute w-[1222px] h-[348.95px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#113336] min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 bottom-0 left-[65.3%] flex justify-center items-center">
        <Image
          src={Map}
          alt="Map"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="absolute  right-[8.02%] top-[26.65%] bottom-[8.01%] flex flex-col items-start text-left space-y-2 w-[1222px] h-[348.95px]">
        <h2 className="absolute left-[2.95%] right-[64.89%] top-[0.15%] bottom-[82.65%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
          عدد الراغبين بالتبرع
        </h2>
        <div
          onClick={handleCounterClick}
          className="bg-gradient-to-r from-[#178B48] to-[#337398] bg-clip-text text-transparent text-6xl sm:text-7xl md:text-8xl lg:text-[17rem] font-bold cursor-pointer leading-none transition-colors duration-300 hover:text-[#113336]"
        >
          {counter.toFixed(3)}
        </div>
      </div>
    </div>
  );
}
