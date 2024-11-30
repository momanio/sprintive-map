"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import SaudiMap from "@/components/SaudiMap";

interface DonationCity {
  id: string;
  name: string;
}

const Page = () => {
  const [cities, setCities] = useState<DonationCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("/data/db.json");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("data", data);
      setCities(data.data);
    }
    fetchCities().catch(console.error);
  }, []);

  const handleCityClick = (id: string | null) => {
    setSelectedCity((prevSelectedCity) =>
      prevSelectedCity === id ? null : id
    );
    console.log("selectedCity", id);
  };

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
        <SaudiMap
          selectedCity={selectedCity}
          handleCityClick={handleCityClick}
          cities={cities}
        />
      </div>
    </div>
  );
};

export default Page;
