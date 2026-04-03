import { crops } from "@/lib/cropData";

const CropStatsBar = () => (
  <section className="border-y bg-card py-6 overflow-x-auto">
    <div className="container mx-auto px-4">
      <div className="flex gap-6 md:gap-10 justify-start md:justify-center min-w-max">
        {crops.slice(0, 6).map((c) => (
          <div key={c.name} className="text-center">
            <span className="text-2xl">{c.emoji}</span>
            <p className="text-xs font-medium mt-1">{c.name}</p>
            <p className="text-sm font-bold text-primary">₹{c.basePrice.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CropStatsBar;
