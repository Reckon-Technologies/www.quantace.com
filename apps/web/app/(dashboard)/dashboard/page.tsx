"use client";

import WelcomeBanner from "../_components/welcome-banner";
import Quotes from "./_components/quotes-page";

const insuranceQuotes = [
  {
    logo: "/img/Sanlam_logo.png",
    pricing: {
      regular: "2500",
      offer: "1900",
      savings: "600",
      savingsPercent: "24%",
    },
    offer: true,
    company: "Geico",
    rating: 4.8,
    reviews: "12.4k",
    features: [
      "24/7 Support",
      "Mobile App",
      "Quick Claims",
      "Multi-policy Discount",
    ],
  },
  {
    logo: "img/jubilee-logo.png",
    pricing: {
      regular: "2800",
      offer: "2100",
      savings: "700",
      savingsPercent: "25%",
    },
    company: "State Farm",
    rating: 4.7,
    reviews: "15.2k",
    features: [
      "Local Agents",
      "Accident Forgiveness",
      "Ride Share",
      "Home Bundle",
    ],
  },
  {
    logo: "img/cic-logo.png",
    pricing: {
      regular: "2700",
      offer: "1950",
      savings: "750",
      savingsPercent: "28%",
    },
    company: "Progressive",
    rating: 4.6,
    reviews: "11.8k",
    features: [
      "Name Your Price",
      "Snapshot Discount",
      "Deductible Savings",
      "Online Tools",
    ],
  },
  // {
  //   logo: "https://example.com/logos/allstate.svg",
  //   pricing: {
  //     regular: "3000",
  //     offer: "2200",
  //     savings: "800",
  //     savingsPercent: "27%"
  //   },
  //   company: "Allstate",
  //   rating: 4.5,
  //   reviews: "9.7k",
  //   features: ["Safe Driving Bonus", "Claim Satisfaction", "New Car Replacement", "Deductible Rewards"]
  // },
  // {
  //   logo: "https://example.com/logos/liberty-mutual.svg",
  //   pricing: {
  //     regular: "2600",
  //     offer: "1850",
  //     savings: "750",
  //     savingsPercent: "29%"
  //   },
  //   company: "Liberty Mutual",
  //   rating: 4.4,
  //   reviews: "8.9k",
  //   features: ["Better Car Replacement", "Accident Forgiveness", "Deductible Fund", "24/7 Support"]
  // },
  // {
  //   logo: "https://example.com/logos/nationwide.svg",
  //   pricing: {
  //     regular: "2900",
  //     offer: "2050",
  //     savings: "850",
  //     savingsPercent: "29%"
  //   },
  //   company: "Nationwide",
  //   rating: 4.6,
  //   reviews: "7.5k",
  //   features: ["Vanishing Deductible", "On Your Side", "SmartRide", "Total Loss Deductible"]
  // },
  // {
  //   logo: "https://example.com/logos/farmers.svg",
  //   pricing: {
  //     regular: "2750",
  //     offer: "2000",
  //     savings: "750",
  //     savingsPercent: "27%"
  //   },
  //   company: "Farmers",
  //   rating: 4.3,
  //   reviews: "6.8k",
  //   features: ["Signal App", "Multi-car Discount", "Student Discount", "Pay-in-full Discount"]
  // },
  // {
  //   logo: "https://example.com/logos/usaa.svg",
  //   pricing: {
  //     regular: "2400",
  //     offer: "1750",
  //     savings: "650",
  //     savingsPercent: "27%"
  //   },
  //   company: "USAA",
  //   rating: 4.9,
  //   reviews: "5.2k",
  //   features: ["Military Discount", "Superior Claims", "Family Coverage", "Loyalty Rewards"]
  // }
];

export interface IQuotesPageProps {}

export default function QuotesPage(props: IQuotesPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      <WelcomeBanner title="Welcome Back" description="John Doe" />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        {/* <EmptyQuotesPage /> */}
        <Quotes insuranceQuotes={insuranceQuotes} />
      </main>
    </div>
  );
}
