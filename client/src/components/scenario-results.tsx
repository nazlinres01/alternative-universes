import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Share2, Plus, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Scenario } from "@shared/schema";

interface ScenarioResultsProps {
  scenario: Scenario & { sections?: { title: string; content: string; }[] };
  onGenerateNew: () => void;
}

const categoryConfig = {
  historical: { gradient: "category-historical", icon: "🏛️" },
  technological: { gradient: "category-technological", icon: "🤖" },
  social: { gradient: "category-social", icon: "👥" },
  environmental: { gradient: "category-environmental", icon: "🌿" },
  economic: { gradient: "category-economic", icon: "📈" },
};

export default function ScenarioResults({ scenario, onGenerateNew }: ScenarioResultsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/scenarios/${scenario.id}/like`);
      return response.json();
    },
    onSuccess: () => {
      setIsLiked(true);
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({
        title: "Scenario Liked!",
        description: "Thanks for your feedback.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to like scenario",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share this scenario with others.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const config = categoryConfig[scenario.category as keyof typeof categoryConfig] || categoryConfig.historical;

  // Parse content if it contains sections
  const contentParts = scenario.content.split('\n\n## ');
  const introContent = contentParts[0];
  const sections = contentParts.slice(1).map(part => {
    const [title, ...contentLines] = part.split('\n\n');
    return {
      title: title.replace('## ', ''),
      content: contentLines.join('\n\n')
    };
  });

  return (
    <Card className="glass-effect border-white/20 max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Circle className="w-3 h-3 text-accent fill-current animate-pulse" />
            <span className="text-sm text-gray-300">Alternative Universe Generated</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={handleShare}
            >
              <Share2 className="text-gray-300" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={() => likeMutation.mutate()}
              disabled={isLiked || likeMutation.isPending}
            >
              <Bookmark className={`${isLiked ? 'text-accent' : 'text-gray-300'}`} size={16} />
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <span className={`${config.gradient} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            <span className="mr-1">{config.icon}</span>
            {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-white">
          {scenario.title}
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-200 leading-relaxed mb-6">
            {introContent}
          </p>
          
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {section.title}
              </h3>
              <p className="text-gray-200 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <Button 
            onClick={onGenerateNew}
            className="bg-primary hover:bg-primary/80 text-white font-medium"
          >
            <Plus className="mr-2" size={16} />
            Explore Another Universe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
