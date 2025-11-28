import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PropertyFilter from "@/components/PropertyFilter";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyComparisonBanner from "@/components/PropertyComparisonBanner";
import WhyTruAssets from "@/components/WhyTruAssets";
import InvestorTools from "@/components/InvestorTools";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const [propertyFilters, setPropertyFilters] = useState({
    searchTerm: "",
    propertyType: "",
    budget: ""
  });

  // Scroll to top when navigating to home page
  useEffect(() => {
    // If no scroll target, scroll to top
    if (!location.state || !(location.state as { scrollTo?: string }).scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // Handle scrolling when navigating from other pages
  useEffect(() => {
    if (location.state && (location.state as { scrollTo?: string }).scrollTo) {
      const scrollTo = (location.state as { scrollTo: string }).scrollTo;
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear the state to prevent re-scrolling on re-renders
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleFilterChange = (filters: typeof propertyFilters) => {
    setPropertyFilters(filters);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <PropertyFilter onFilterChange={handleFilterChange} />
      <FeaturedProperties filters={propertyFilters} />
      <PropertyComparisonBanner />
      <WhyTruAssets />
      <InvestorTools />
      <Testimonials />
      <About />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
