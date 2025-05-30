import { useState } from "react";
import ScenarioForm from "./scenario-form";
import LoadingState from "./loading-state";
import ScenarioResults from "./scenario-results";
import type { Scenario } from "@shared/schema";

export default function HeroSection() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScenarioGenerated = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setIsLoading(false);
  };

  const handleGenerateNew = () => {
    setCurrentScenario(null);
  };

  const handleStartGeneration = () => {
    setIsLoading(true);
    setCurrentScenario(null);
  };

  return (
    <section className="relative px-4 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Floating animation elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float hidden lg:block"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }}></div>
        
        {!currentScenario && !isLoading && (
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Explore <span className="gradient-text">Alternative Universes</span><br />
              with AI-Powered Scenarios
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Ask "What if?" questions and discover fascinating alternative realities. 
              From historical changes to futuristic possibilities - every scenario is unique.
            </p>
            
            <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <ScenarioForm 
                onScenarioGenerated={handleScenarioGenerated}
                onStartGeneration={handleStartGeneration}
              />
            </div>
          </div>
        )}

        {isLoading && <LoadingState />}
        
        {currentScenario && (
          <ScenarioResults 
            scenario={currentScenario} 
            onGenerateNew={handleGenerateNew}
          />
        )}
      </div>
    </section>
  );
}
