import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, Users, ShieldCheck, Leaf, BarChart3 } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Predictions", description: "Advanced machine learning models analyze historical data, weather patterns, and market trends to deliver accurate price forecasts." },
  { icon: TrendingUp, title: "Real-Time Market Insights", description: "Stay updated with live market trends, price fluctuations, and seasonal patterns across all major Indian crops." },
  { icon: Users, title: "Built for Farmers", description: "Simple, intuitive interface designed for farmers of all backgrounds. No technical knowledge required." },
  { icon: ShieldCheck, title: "Trusted & Reliable", description: "Our models are trained on years of government market data (Agmarknet) ensuring reliable and transparent predictions." },
  { icon: Leaf, title: "Crop-Specific Analysis", description: "Detailed analysis for 8+ major crops including Wheat, Rice, Maize, Cotton, Sugarcane, and more." },
  { icon: BarChart3, title: "Actionable Recommendations", description: "Get clear sell/hold/monitor advice so you can make confident decisions about when to take your produce to market." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About CropPredict AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We empower Indian farmers with AI-driven crop price predictions, helping them make
            smarter selling decisions and maximize their income.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((f) => (
            <Card key={f.title} className="shadow-card border-border/50 hover:shadow-card-hover transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-lg bg-accent w-12 h-12 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-8 max-w-3xl mx-auto text-center shadow-card">
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            Agriculture is the backbone of India. Yet farmers often lack access to timely market information,
            leading to losses. CropPredict AI bridges this gap by combining cutting-edge machine learning with
            accessible design — giving every farmer the power to predict, plan, and profit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
