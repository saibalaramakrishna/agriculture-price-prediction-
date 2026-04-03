export interface CropInfo {
  name: string;
  emoji: string;
  unit: string;
  basePrice: number;
}

export const crops: CropInfo[] = [
  { name: "Wheat", emoji: "🌾", unit: "quintal", basePrice: 2275 },
  { name: "Rice", emoji: "🍚", unit: "quintal", basePrice: 2183 },
  { name: "Maize", emoji: "🌽", unit: "quintal", basePrice: 1962 },
  { name: "Cotton", emoji: "🧶", unit: "quintal", basePrice: 6620 },
  { name: "Sugarcane", emoji: "🎋", unit: "quintal", basePrice: 315 },
  { name: "Soybean", emoji: "🫘", unit: "quintal", basePrice: 4600 },
  { name: "Mustard", emoji: "🌿", unit: "quintal", basePrice: 5650 },
  { name: "Potato", emoji: "🥔", unit: "quintal", basePrice: 1200 },
];

export const states = [
  "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka",
  "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Uttar Pradesh",
  "West Bengal", "Tamil Nadu",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateHistoricalPrices(crop: CropInfo, months = 12) {
  const data = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const seed = crop.name.length * 100 + d.getMonth() + d.getFullYear();
    const variation = (seededRandom(seed) - 0.5) * 0.2;
    const trend = (months - i) * 0.008;
    const price = Math.round(crop.basePrice * (1 + variation + trend));
    data.push({
      month: d.toLocaleString("default", { month: "short", year: "2-digit" }),
      price,
    });
  }
  return data;
}

export function generateForecast(crop: CropInfo, days = 7) {
  const data = [];
  const now = new Date();
  let lastPrice = crop.basePrice;
  for (let i = 1; i <= days; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const seed = crop.name.length * 50 + d.getDate() + d.getMonth() * 31;
    const change = (seededRandom(seed) - 0.45) * 0.03;
    lastPrice = Math.round(lastPrice * (1 + change));
    data.push({
      day: d.toLocaleDateString("default", { weekday: "short", month: "short", day: "numeric" }),
      price: lastPrice,
      change: +(change * 100).toFixed(2),
    });
  }
  return data;
}

export function predictPrice(crop: CropInfo, state: string) {
  const seed = crop.name.length + state.length * 7;
  const factor = 1 + (seededRandom(seed) - 0.4) * 0.15;
  return Math.round(crop.basePrice * factor);
}

export function getRecommendation(currentPrice: number, predictedPrice: number) {
  const diff = ((predictedPrice - currentPrice) / currentPrice) * 100;
  if (diff > 5) return { action: "HOLD", message: `Prices expected to rise by ${diff.toFixed(1)}%. Consider holding your stock for better returns.`, color: "primary" as const };
  if (diff > 0) return { action: "MONITOR", message: `Slight upward trend of ${diff.toFixed(1)}%. Keep monitoring the market closely.`, color: "secondary" as const };
  return { action: "SELL NOW", message: `Prices may drop by ${Math.abs(diff).toFixed(1)}%. Consider selling soon to maximize profit.`, color: "destructive" as const };
}

export function getModelComparison(crop: CropInfo, state: string) {
  const base = predictPrice(crop, state);
  return [
    { model: "Random Forest", price: base, accuracy: 94.2, badge: "Best" },
    { model: "Linear Regression", price: Math.round(base * 0.97), accuracy: 88.7, badge: "" },
    { model: "Gradient Boosting", price: Math.round(base * 1.01), accuracy: 92.1, badge: "" },
  ];
}
