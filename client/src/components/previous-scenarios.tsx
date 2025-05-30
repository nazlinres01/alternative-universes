import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Scenario } from "@shared/schema";

const categoryConfig = {
  historical: { gradient: "category-historical", icon: "🏛️" },
  technological: { gradient: "category-technological", icon: "🤖" },
  social: { gradient: "category-social", icon: "👥" },
  environmental: { gradient: "category-environmental", icon: "🌿" },
  economic: { gradient: "category-economic", icon: "📈" },
};

export default function PreviousScenarios() {
  const { data: scenariosData, isLoading } = useQuery({
    queryKey: ["/api/scenarios"],
    queryFn: async () => {
      const response = await fetch("/api/scenarios", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      return response.json();
    },
  });

  const scenarios = scenariosData?.scenarios || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getPreview = (content: string) => {
    const plainText = content.replace(/##.*?\n/g, '').replace(/\n+/g, ' ');
    return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
  };

  if (scenarios.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Previous Explorations</h2>
          <p className="text-gray-300">Revisit the alternative universes you've discovered</p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-effect border-white/20 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-600 rounded mb-4"></div>
                  <div className="h-4 bg-gray-600 rounded mb-3"></div>
                  <div className="h-16 bg-gray-600 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-600 rounded w-16"></div>
                    <div className="h-3 bg-gray-600 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario: Scenario) => {
              const config = categoryConfig[scenario.category as keyof typeof categoryConfig] || categoryConfig.historical;
              
              return (
                <Card 
                  key={scenario.id} 
                  className="scenario-card glass-effect border-white/20 cursor-pointer hover:border-white/40 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`${config.gradient} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        <span className="mr-1">{config.icon}</span>
                        {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatDate(scenario.createdAt.toString())}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold mb-3 text-white line-clamp-2">
                      {scenario.title}
                    </h3>
                    
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                      {getPreview(scenario.content)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {scenario.views} views
                      </span>
                      <span className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {scenario.likes} likes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        {scenarios.length >= 6 && (
          <div className="text-center mt-8">
            <Button variant="link" className="text-primary hover:text-primary/80 font-medium">
              View All Scenarios →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
