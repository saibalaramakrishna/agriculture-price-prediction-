import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CropInfo, getModelComparison } from "@/lib/cropData";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ModelComparisonProps {
  crop: CropInfo | null;
  state: string;
}

const ModelComparison = ({ crop, state }: ModelComparisonProps) => {
  if (!crop || !state) return null;

  const models = getModelComparison(crop, state);

  return (
    <Card className="shadow-card border-border/50 animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Brain className="h-5 w-5 text-primary" />
          Model Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {models.map((m) => (
          <div key={m.model} className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{m.model}</span>
                {m.badge && <Badge className="text-xs">{m.badge}</Badge>}
              </div>
              <span className="font-bold">₹{m.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={m.accuracy} className="flex-1 h-2" />
              <span className="text-xs text-muted-foreground w-12 text-right">{m.accuracy}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ModelComparison;
