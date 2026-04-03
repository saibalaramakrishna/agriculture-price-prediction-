import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crops, states, predictPrice, getRecommendation, type CropInfo } from "@/lib/cropData";
import { Search, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PredictionFormProps {
  onPredict: (crop: CropInfo, state: string) => void;
}

const PredictionForm = ({ onPredict }: PredictionFormProps) => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [result, setResult] = useState<{ crop: CropInfo; predicted: number; recommendation: ReturnType<typeof getRecommendation> } | null>(null);

  const handlePredict = () => {
    const crop = crops.find((c) => c.name === selectedCrop);
    if (!crop || !selectedState) return;
    const predicted = predictPrice(crop, selectedState);
    const recommendation = getRecommendation(crop.basePrice, predicted);
    setResult({ crop, predicted, recommendation });
    onPredict(crop, selectedState);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-primary" />
            Predict Crop Price
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Select Crop</label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop..." />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.emoji} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Select State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a state..." />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    📍 {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handlePredict}
            disabled={!selectedCrop || !selectedState}
            className="w-full"
            size="lg"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Predict Price
          </Button>
        </CardContent>
      </Card>

      {result ? (
        <Card className="shadow-card border-border/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">
              {result.crop.emoji} {result.crop.name} — Price Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                <p className="text-2xl font-bold">₹{result.crop.basePrice.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per {result.crop.unit}</p>
              </div>
              <div className="rounded-lg bg-accent p-4">
                <p className="text-xs text-accent-foreground/70 mb-1">Predicted Price</p>
                <p className="text-2xl font-bold text-accent-foreground">₹{result.predicted.toLocaleString()}</p>
                <p className="text-xs text-accent-foreground/70">per {result.crop.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {result.predicted >= result.crop.basePrice ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className="text-sm font-medium">
                {result.predicted >= result.crop.basePrice ? "+" : ""}
                {(((result.predicted - result.crop.basePrice) / result.crop.basePrice) * 100).toFixed(1)}% change expected
              </span>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <Badge variant={result.recommendation.color === "primary" ? "default" : result.recommendation.color === "destructive" ? "destructive" : "secondary"}>
                  {result.recommendation.action}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{result.recommendation.message}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-card border-border/50 flex items-center justify-center">
          <CardContent className="text-center py-12">
            <div className="text-5xl mb-4">🌾</div>
            <p className="text-muted-foreground">Select a crop and state to get<br />AI-powered price predictions</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionForm;
