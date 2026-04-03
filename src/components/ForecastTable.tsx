import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CropInfo, generateForecast } from "@/lib/cropData";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface ForecastTableProps {
  crop: CropInfo | null;
}

const ForecastTable = ({ crop }: ForecastTableProps) => {
  if (!crop) return null;

  const forecast = generateForecast(crop);

  return (
    <Card className="shadow-card border-border/50 animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-5 w-5 text-primary" />
          7-Day Price Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {forecast.map((f, i) => (
            <div
              key={i}
              className="rounded-lg border p-3 text-center hover:shadow-card-hover transition-shadow"
            >
              <p className="text-xs text-muted-foreground mb-1">{f.day}</p>
              <p className="text-lg font-bold">₹{f.price.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {f.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${f.change >= 0 ? "text-primary" : "text-destructive"}`}>
                  {f.change >= 0 ? "+" : ""}{f.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastTable;
