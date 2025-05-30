import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { generateScenarioSchema, type GenerateScenarioRequest, type Scenario } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ScenarioFormProps {
  onScenarioGenerated: (scenario: Scenario) => void;
  onStartGeneration: () => void;
}

const categories = [
  { id: "historical", label: "Historical", icon: "🏛️", gradient: "category-historical" },
  { id: "technological", label: "Tech", icon: "🤖", gradient: "category-technological" },
  { id: "social", label: "Social", icon: "👥", gradient: "category-social" },
  { id: "environmental", label: "Environment", icon: "🌿", gradient: "category-environmental" },
  { id: "economic", label: "Economic", icon: "📈", gradient: "category-economic" },
] as const;

export default function ScenarioForm({ onScenarioGenerated, onStartGeneration }: ScenarioFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("historical");
  const { toast } = useToast();

  const form = useForm<GenerateScenarioRequest>({
    resolver: zodResolver(generateScenarioSchema),
    defaultValues: {
      question: "",
      category: "historical",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateScenarioRequest) => {
      const response = await apiRequest("POST", "/api/scenarios/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      onScenarioGenerated(data.scenario);
      toast({
        title: "Scenario Generated!",
        description: "Your alternative universe is ready to explore.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate scenario. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GenerateScenarioRequest) => {
    onStartGeneration();
    generateMutation.mutate({ ...data, category: selectedCategory as any });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-gray-300 font-medium">
                What if...
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What if humans had evolved from dolphins instead of primates?"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="text-left">
          <FormLabel className="text-gray-300 font-medium mb-3 block">
            Category
          </FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                type="button"
                variant="ghost"
                className={`${category.gradient} text-white px-3 py-2 text-sm font-medium hover:opacity-80 transition-opacity ${
                  selectedCategory === category.id ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  form.setValue("category", category.id as any);
                }}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 px-8 transition-all transform hover:scale-105"
          disabled={generateMutation.isPending}
        >
          <Sparkles className="mr-2" size={20} />
          Generate Alternative Universe
        </Button>
      </form>
    </Form>
  );
}
