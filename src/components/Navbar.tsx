import { Leaf } from "lucide-react";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm">CropPredict AI</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <button onClick={() => scrollTo("predict")} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">Predict</button>
          <button onClick={() => scrollTo("about")} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">About</button>
          <button onClick={() => scrollTo("contact")} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
