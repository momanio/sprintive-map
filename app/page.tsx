"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface DonationCity {
  id: string;
  name: string;
  donationCount: number;
}

export default function Home() {
  const [cities, setCities] = useState<DonationCity[]>([]);
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);

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

  const toggleCityDetails = (id: string) => {
    setExpandedCityId(expandedCityId === id ? null : id);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start min-h-screen bg-[#001f1e] text-white">
      <div className="w-full lg:w-1/2 flex justify-center p-6">
        <Image
          src="/Map.svg"
          alt="Map"
          width={600}
          height={400}
          className="max-w-full"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-end p-6">
        <p className="mb-4 text-right text-sm lg:text-base text-gray-300">
          التالي شرح مفصل لأعداد المتبرعين، حيث تم تقسيمهم إلى فئات استنادًا إلى
          المدينة ونوع العضو المطروح للتبرع.
        </p>
        <div className="w-full lg:w-auto max-h-[400px] overflow-y-auto bg-[#003734] rounded-lg shadow-lg p-4">
          <ul className="divide-y divide-gray-700">
            {cities.map((city) => (
              <li key={city.id} className="py-3 flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-right text-gray-200">{city.name}</span>
                  <button
                    onClick={() => toggleCityDetails(city.id)}
                    className="ml-2 text-gray-400 hover:text-gray-200"
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </button>
                </div>
                {expandedCityId === city.id && (
                  <div className="mt-2 text-sm text-gray-300">
                    Donation Count:{" "}
                    <span className="text-white">{city.donationCount}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
