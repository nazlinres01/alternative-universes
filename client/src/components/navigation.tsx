import { Menu, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  return (
    <nav className="relative z-50 px-4 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Infinity className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold gradient-text">What If GPT</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/explore" className="text-gray-300 hover:text-white transition-colors">Keşfet</a>
          <a href="/my-scenarios" className="text-gray-300 hover:text-white transition-colors">Senaryolarım</a>
          <a href="/about" className="text-gray-300 hover:text-white transition-colors">Hakkında</a>
          <Button className="bg-primary hover:bg-primary/80">
            Giriş Yap
          </Button>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-6">
              <a href="/explore" className="text-gray-300 hover:text-white transition-colors">Keşfet</a>
              <a href="/my-scenarios" className="text-gray-300 hover:text-white transition-colors">Senaryolarım</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">Hakkında</a>
              <Button className="bg-primary hover:bg-primary/80 w-fit">
                Giriş Yap
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
