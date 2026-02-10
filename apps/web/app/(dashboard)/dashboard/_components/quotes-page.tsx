import FilterPanel from "./filter-panel";
import QuoteCards from "./quote-cards";
import SidebarMenu from "./sidebar-menu";

export interface IQuotesPageProps {
  insuranceQuotes: Array<{
    logo: string;
    pricing: {
      regular: string;
      offer: string;
      savings: string;
      savingsPercent: string;
    };
    offer?: boolean;
    company: string;
    rating: number;
    reviews: string;
    features: string[];
  }>;
}

export default function Quotes({ insuranceQuotes }: IQuotesPageProps) {
  return (
    <div className="w-full flex flex-1 bg-muted">
      <div className="w-full grid grid-cols-1 md:grid-cols-7 gap-4 container mx-auto my-4">
        {/* Side Menu */}
        <div className="col-span-2">
          <SidebarMenu />
        </div>

        {/* Quotes Section */}
        <div className="col-span-5">
          <FilterPanel />

          {/* Curated Quotes */}
          <div className="flex flex-col gap-4 mt-4">
            {insuranceQuotes.map(
              (
                { company, features, logo, pricing, rating, reviews, offer },
                _i
              ) => (
                <QuoteCards key={_i} logo={logo} pricing={pricing} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
