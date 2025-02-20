'use client'

import { createSubscription } from "@/actions/payments";
import { pricing } from "@/lib/pricing";
import { Price } from "@/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { data: session  } = useSession();
  const [tierSelected, setTierSelected] = useState('M')

  return (
    <div className="max-w-5xl mx-auto font-[sans-serif] p-4">
      <div className="text-center">
        <h2 className="text-gray-800 text-3xl font-bold">Pricing Plans</h2>
      </div>

      <div className="flex mx-auto bg-gray-100 rounded-full max-w-[250px] p-1 mt-8">
        <button 
          onClick={() => setTierSelected('M')} 
          className={`w-full text-sm py-2 px-4 rounded-full ${tierSelected === 'M' ? 'text-white bg-blue-500' : ''}`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setTierSelected('Y')} 
          className={`w-full text-sm py-2 px-4 rounded-full ${tierSelected === 'Y' ? 'text-white bg-blue-500' : ''}`}
        >
          Yearly
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 max-lg:gap-8 mt-8 max-lg:max-w-3xl max-md:max-w-sm max-lg:mx-auto">
        {pricing
          .filter(price => price.term === tierSelected)
          .map((price: Price, index: number) => price.term === tierSelected && (
          <div key={price.productId} className={`bg-gray-100 rounded-3xl overflow-hidden p-8 ${index === 1 ? 'bg-white lg:scale-[1.05] shadow-[0_2px_40px_-4px_rgba(93,96,127,0.2)] rounded-3xl overflow-hidden p-8' : ''}`}>
            <div className="text-left">
              <h4 className="text-gray-800 font-semibold text-2xl">{price.title}</h4>
              <p className="text-gray-600 text-sm mt-2">{price.description}</p>
              <h3 className="text-gray-800 font-semibold text-2xl mt-4">£{price.price}.00<sub className="text-sm font-medium text-gray-600 ml-1">/ {price.term === 'M' ? 'Month' : 'Yearly'}</sub></h3>
              <button 
                type="button"
                onClick={async () => {
                  const response = await createSubscription(price.priceId, session?.user.id)
                  if (response?.url) redirect(response?.url)
                }} 
                className="w-full mt-8 px-5 py-2.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-full"
              >
                Start 7 Day Free Trial
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-gray-800 font-semibold text-lg mb-4">Plan Included</h4>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  50 Image generations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  500 Credits
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Customer Support
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  50GB Cloud Storage
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited Book Mark
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited basic feature
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


