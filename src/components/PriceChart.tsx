import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type CropInfo, generateHistoricalPrices } from "@/lib/cropData";
import { BarChart3 } from "lucide-react";

interface PriceChartProps {
  crop: CropInfo | null;
}

const PriceChart = ({ crop }: PriceChartProps) => {
  if (!crop) return null;

  const data = generateHistoricalPrices(crop);

  return (
    <Card className="shadow-card border-border/50 animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BarChart3 className="h-5 w-5 text-primary" />
          {crop.emoji} {crop.name} — Price Trend (12 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(80, 15%, 88%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Price"]}
              />
              <Area type="monotone" dataKey="price" stroke="hsl(142, 71%, 35%)" strokeWidth={2} fill="url(#priceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
