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
    <div className="bg-white text-[#113336] min-h-screen flex items-center justify-center">
      <div className="absolute text-[#113336] pl-[50rem] opacity-85">
        <Image src={Map} alt="Map" width={424} height={348.95} priority />
      </div>
      <div className="relative flex flex-col  items-center text-center ">
        <h2 className="text-5xl font-medium">عدد الراغبين بالتبرع</h2>

        <div
          onClick={handleCounterClick}
          className="text-[#113336] text-[17rem] sm:text-7xl md:text-8xl lg:text-[17rem] font-bold cursor-pointer leading-none"
        >
          {counter.toFixed(3)}
        </div>
      </div>
    </div>
  );
}
