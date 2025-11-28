import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoiSection from "@/components/RoiSection";

const RoiCalculatorPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <RoiSection />
      <Footer />
    </div>
  );
};

export default RoiCalculatorPage;

