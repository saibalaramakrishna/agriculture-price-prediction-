import { useState } from "react";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import CropStatsBar from "@/components/CropStatsBar";
import PredictionForm from "@/components/PredictionForm";
import PriceChart from "@/components/PriceChart";
import ForecastTable from "@/components/ForecastTable";
import ModelComparison from "@/components/ModelComparison";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { type CropInfo } from "@/lib/cropData";
import { Leaf } from "lucide-react";

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);
  const [selectedState, setSelectedState] = useState("");

  const handlePredict = (crop: CropInfo, state: string) => {
    setSelectedCrop(crop);
    setSelectedState(state);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      <HeroSection />
      <CropStatsBar />

      <main id="predict" className="container mx-auto px-4 py-10 space-y-8">
        <PredictionForm onPredict={handlePredict} />
        <PriceChart crop={selectedCrop} />
        <div className="grid md:grid-cols-2 gap-6">
          <ForecastTable crop={selectedCrop} />
          <ModelComparison crop={selectedCrop} state={selectedState} />
        </div>
      </main>

      <AboutSection />
      <ContactSection />

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">CropPredict AI</span>
          </div>
          <p className="text-xs text-muted-foreground">AI-powered crop price predictions for smarter farming decisions</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
