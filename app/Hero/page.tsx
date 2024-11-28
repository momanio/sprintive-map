"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import SaudiMap from "@/components/SaudiMap";

interface DonationCity {
  id: string;
  name: string;
}

const Hero = () => {
  const [cities, setCities] = useState<DonationCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("/data/db.json");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setCities(data.data);
    }
    fetchCities().catch(console.error);
  }, []);

  const handleCityClick = (id: string) => {
    setSelectedCity(selectedCity === id ? null : id);
  };

  const selectedCityName = cities.find(
    (city) => city.id === selectedCity
  )?.name;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start min-h-screen bg-[#113336] text-white">
      <div className="w-[424px] lg:w-1/2 flex flex-col pr-12 pl-8 pt-12">
        <p className="font-normal text-lg text-[#FFFFFF] mb-6">
          التالي شرح مفصل لعدد الراغبين بالتبرع، حيث تم تقسيمهم إلى فئات
          استنادًا إلى المنطقة ونوع العضو المطروح للتبرع
        </p>
        <div>
          {cities.map((city) => (
            <div
              key={city.id}
              className={`p-4  rounded-lg cursor-pointer shadow-md transition-all ${
                selectedCity === city.id
                  ? "bg-[#FFFFFF] text-[#00102E] border-l-4 "
                  : "bg-[#E5E5E5] text-[#7A8191] hover:bg-[#D6D6D6]"
              }`}
              onClick={() => handleCityClick(city.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{city.name}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    selectedCity === city.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              {selectedCity === city.id && (
                <div className="flex flex-col items-center mt-4">
                  <Image
                    src="/sy_34_1 1.png"
                    alt="dummy image"
                    width={450}
                    height={232}
                    className="rounded-md shadow-lg"
                  />
                  <p className="text-[#00102E] text-lg font-medium mt-4">
                    عدد الراغبين بالتبرع
                  </p>
                  <h3 className="text-3xl text-[#2B7B80] font-semibold">
                    23232
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-auto pt-16 pb-24 lg:pt-32 flex justify-center relative">
        <SaudiMap selectedCity={selectedCity} />
        {selectedCity && (
          <>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#00102E]"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#00102E]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#C34147] rounded-full"></div>
            {selectedCityName && (
              <div className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2 -mt-3 font-normal text-[#52606D]">
                {selectedCityName}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
