import heroImg from "@/assets/hero-farm.jpg";
import { TrendingUp, Leaf, BarChart3 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Agricultural landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
      </div>
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wider uppercase">AI-Powered Agriculture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Crop Price<br />
            <span className="text-secondary">Prediction System</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
            Harness machine learning to predict crop prices, discover market trends,
            and get actionable recommendations for better farming decisions.
          </p>
          <div className="flex flex-wrap gap-6 text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="text-sm">Real-time Predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              <span className="text-sm">7-Day Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span className="text-sm">Smart Recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
